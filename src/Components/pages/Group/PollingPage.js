
import React, { useState } from 'react'
import Header from '../../Widgets/Header'
import PageHeader from '../../Widgets/PageHeader?'
import Footer from '../../Widgets/Footer'
import { Link } from 'react-router-dom'


const PollingPage = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const [votes, setVotes] = useState({
        increaseContrib: 0,
        extendDuration: 0,
        moreMeetings: 0,
        newLeader: 0,
        newMembers: 0,
    });

    const handleVote = (option) => {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [option]: prevVotes[option] + 1,
        }));
        setSelectedOption(option);
    };

    const getTotalVotes = () => {
        return Object.values(votes).reduce((acc, curr) => acc + curr, 0);
    };

    const renderResults = () => {
        const totalVotes = getTotalVotes();
        return (
            <div className="results">

                <h3>Voting Results:</h3>
                <ul>
                    {Object.keys(votes).map((option) => (
                        <li key={option}>
                            {option.replace(/([A-Z])/g, ' $1')}: {votes[option]} votes ({((votes[option] / totalVotes) * 100).toFixed(2)}%)
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
    return (
        <>
            <Header />
            <PageHeader title="Polling" text="Polling" />
            <section className="account padding-top padding-bottom sec-bg-color2">
                <div className="container">

                </div>
                <div className="account__shape">
                    <span className="account__shape-item account__shape-item--1">
                        <img src="/images/contact/4.png" alt="shape-icon" />
                    </span>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default PollingPage

