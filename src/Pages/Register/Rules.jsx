import React from "react";
import "./Register.css";

export default function Rules() {
  return (
    <>
      <div className="below-nav">
        <div style={{ maxWidth: 800 }}>
          <h3>RULES AND REGULATIONS</h3>
          <h4 style={{ textAlign: "left" }}>
            The following rules and regulations have to be adhered to strictly
            during the Internship Expo:
          </h4>
          <ol style={{ textAlign: "left" }}>
            <li>The registration will begin from 26th April, 2021 10PM IST</li>
            <li>
              A participant can only register for interviews with any two
              companies of their choice.
            </li>
            <li>
              The registration for the interviews will be done on a first come
              first serve basis and no special requests will be entertained.
            </li>
            <li>
              After the registration closes on 30th April, 2021 no change in the
              choice of company from the participants will be accepted.
            </li>
            <li>
              A participant can only register for the expo and choose the
              company of their choice after they upload their resume on the
              portal.
            </li>
            <li>
              After a participant has registered for their choice of company it
              is mandatory to join the discord server of ‘Internship Expo’21’,
              The link for the same will be provided once registration is
              completed.
            </li>
            <li>
              Interviews for registered companies will take place on Discord,
              details of which will be mailed to you upon registering.
            </li>
            <li>
              E-Cell, VIT reserves the right to make the final call in case of
              any discrepancy amongst the concerned parties.
            </li>
          </ol>
          <h4 style={{textAlign: "left"}}>
            E-Cell VIT shall only act as a bridge between participants and
            Companies taking part in the Internship Expo. Perks of the
            Internship (stipend, duration etc )being offered is left to the
            discretion of the companies.
          </h4>
        </div>
      </div>
    </>
  );
}
