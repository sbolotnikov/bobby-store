import Header from "../components/Header";
import Order from "../components/Order";
import { getSession, useSession } from "next-auth/client";
import moment from "moment";
import db from "../../firebase";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";

function Orders({ orders }) {
    const [session] = useSession();
    console.log( process.env.SERVER_PRIVATE_KEY)
    
        //     "type": "service_account",
        //     "project_id": String(process.env.SERVER_PROJECT_ID),
        //     "private_key_id": String(process.env.SERVER_PRIVATE_KEY_ID),
        //     "private_key": String(process.env.SERVER_PRIVATE_KEY),
        //     "client_email": String(process.env.SERVER_CLIENT_EMAIL),
        //     "client_id": String(process.env.SERVER_CLIENT_ID),
        //     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        //     "token_uri": "https://oauth2.googleapis.com/token",
        //     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        //     "client_x509_cert_url": String(process.env.SERVER_CLIENT_X509_CERT_URL)
        //   }
    return (
        <div className="bg-gray-100 h-screen">
            <Header />
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
                    Your Orders
                </h1>
                {session ? (
                    <h2>{orders.length} Orders</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}

                <div className="mt-5 space-y-4">
                    {orders?.map(
                        ({ id, amount, amountShipping, items, timestamp, images }
                        ) => (
                            <Order
                                key={id}
                                id={id}
                                amount={amount}
                                amountShipping={amountShipping}
                                items={items}
                                timestamp={timestamp}
                                images={images}
                            />
                        ))}
                </div>

            </main>
        </div>
    )
}

export default Orders;

export async function getServerSideProps(context) {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    // GET YHE USER LOGGED IN CREDENTIALS
    const session = await getSession(context);
    if (!session) {
        return {
            props: {},
        }

    };

    // Firebase db
    const q = query(collection(doc(collection(db, 'users'), session.user.email), 'orders'), orderBy("timestamp", "desc"))
    const stripeOrders = await getDocs(q);

    // Stripe orders are ordered
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    );
    return {
        props: {
            orders,
        },
    };
}