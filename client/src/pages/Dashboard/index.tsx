import React from "react";
import store from 'store';
import { TOKEN } from "../../utils/Constants";

const Dashboard = () => (
    <section className="about-us">
        I am dashboard
        <button onClick={() => store.remove(TOKEN)}>Logout</button>
    </section>
);

export default Dashboard;
