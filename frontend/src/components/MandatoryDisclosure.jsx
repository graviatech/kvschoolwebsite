import React from "react";
import "../styles/MandatoryDisclosure.css";
import Banner from "./Banner"; // import the common banner

const MandatoryDisclosure = () => {
  return (
    <div className="mandatory-container">
      {/* Banner */}
      <Banner
        image="/assets/banner-img1.jpg"
      />

      {/* Page Heading */}
      <h2 className="page-heading">Mandatory Disclosure</h2>

      
      

      {/* ================= A : GENERAL INFORMATION ================= */}
      <section className="section">
        <h3>A : GENERAL INFORMATION</h3>
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>INFORMATION</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>NAME OF THE SCHOOL</td><td>Kendriya Vidyalaya Sector-24 Noida</td></tr>
            <tr><td>2</td><td>AFFILIATION NO.(IF APPLICABLE)</td><td>2100045</td></tr>
            <tr><td>3</td><td>SCHOOL CODE (IF APPLICABLE)</td><td>1431</td></tr>
            <tr><td>4</td><td>COMPLETE ADDRESS WITH PIN CODE</td><td>A-7, Sector-24, Noida, Uttar Pradesh - 201301</td></tr>
            <tr><td>5</td><td>PRINCIPAL NAME</td><td>Sh. Khemendra Tondwal</td></tr>
            <tr><td>6</td><td>PRINCIPAL QUALIFICATION</td><td>M.Sc, M.Phill, M.Ed, NET</td></tr>
            <tr><td>7</td><td>SCHOOL EMAIL ID</td><td>kvnoida03@gmail.com</td></tr>
            <tr><td>8</td><td>CONTACT DETAILS (LANDLINE/MOBILE)</td><td>(0120) 4327434, (0120) 4327435</td></tr>
          </tbody>
        </table>
      </section>

      {/* ================= B : DOCUMENTS AND INFORMATION ================= */}
      <section className="section">
        <h3>B : DOCUMENTS AND INFORMATION</h3>
        <table className="disclosure-table">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>DOCUMENTS / INFORMATION</th>
              <th>LINKS</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1","COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY","http://www.gipsm.in/disclosure/COPIES-AFFILIATION.pdf"],
              ["2","COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE","http://www.gipsm.in/disclosure/TRUST-COMPANY.pdf"],
              ["3","COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT./UT","http://www.gipsm.in/disclosure/NOC.pdf"],
              ["4","COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009, AND IT’S RENEWAL IF APPLICABLE","http://www.gipsm.in/disclosure/NOC.pdf"],
              ["5","COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE","http://www.gipsm.in/disclosure/BUILDING.pdf"],
              ["6","COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY","http://www.gipsm.in/disclosure/FIRE-SAFETY.pdf"],
              ["7","COPY OF THE DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATION OR SELF CERTIFICATION BY SCHOOL","http://www.gipsm.in/disclosure/DEO-CERTIFICATE.pdf"],
              ["8","COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES","http://www.gipsm.in/disclosure/WATER-SANITATION.pdf"],
              ["9","SEXUAL HARASSMENT OF WOMEN AT WORKPLACE","http://www.gipsm.in/disclosure/WOMEN-WORKPLACE.pdf"],
              ["10","LIST OF MEMBER OF POCSO COMMITTEE","http://www.gipsm.in/disclosure/POCSO-COMMITTEE.pdf"],
            ].map(([no, info, link]) => (
              <tr key={no}>
                <td>{no}</td>
                <td>{info}</td>
                <td><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="note">
          <b>NOTE:</b> The schools need to upload the self-attested copies of above listed documents by Chairman/Manager/Secretary and Principal. If any uploaded document is found non-genuine later, the school shall be liable for action as per norms.
        </p>
      </section>

      {/* ================= C : RESULT AND ACADEMICS ================= */}
      <section className="section">
        <h3>C : RESULT AND ACADEMICS</h3>
        <table className="disclosure-table">
          <thead>
            <tr><th>SL No.</th><th>DOCUMENTS / INFORMATION</th><th>LINKS</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>FEE STRUCTURE OF THE SCHOOL</td><td><a href="http://www.gipsm.in/disclosure/fee-structure.pdf" target="_blank" rel="noopener noreferrer">fee-structure.pdf</a></td></tr>
            <tr><td>2</td><td>ANNUAL ACADEMIC CALENDER</td><td><a href="http://www.gipsm.in/disclosure/calander-23-24.pdf" target="_blank" rel="noopener noreferrer">calander-23-24.pdf</a></td></tr>
            <tr><td>3</td><td>LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)</td><td><a href="http://www.gipsm.in/disclosure/COMMITTEE.pdf" target="_blank" rel="noopener noreferrer">COMMITTEE.pdf</a></td></tr>
            <tr><td>4</td><td>LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS</td><td><a href="http://www.gipsm.in/disclosure/PTA.pdf" target="_blank" rel="noopener noreferrer">PTA.pdf</a></td></tr>
            <tr><td>5</td><td>LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION AS PER APPLICABILITY</td><td>-</td></tr>
          </tbody>
        </table>
      </section>

      {/* ================= D : STAFF (TEACHING) ================= */}
      <section className="section">
        <h3>D : STAFF (TEACHING)</h3>
        <table className="disclosure-table">
          <thead>
            <tr><th>SL No.</th><th>INFORMATION</th><th>DETAILS</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>PRINCIPAL</td><td>Sh. Khemendra Tondwal</td></tr>
            <tr><td>2</td><td>TOTAL NO. OF TEACHERS</td><td>85 (PGT - 15, TGT - 27, PRT - 29)</td></tr>
            <tr><td>3</td><td>TEACHERS SECTION RATIO</td><td>82:12</td></tr>
            <tr><td>4</td><td>DETAILS OF SPECIAL EDUCATOR</td><td>1</td></tr>
            <tr><td>5</td><td>DETAILS OF COUNSELLOR AND WELLNESS TEACHER</td><td>1</td></tr>
          </tbody>
        </table>

        <h4>RESULT CLASS: X</h4>
        <table className="disclosure-table small">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>YEAR</th>
              <th>NO. OF REGISTERED STUDENTS</th>
              <th>NO. OF STUDENTS PASSED</th>
              <th>PASS PERCENTAGE</th>
              <th>REMARKS</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>2021</td><td>2,250</td><td>17</td><td>100</td><td>-</td></tr>
          </tbody>
        </table>

        <h4>RESULT CLASS: XII</h4>
        <table className="disclosure-table small">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>YEAR</th>
              <th>NO. OF REGISTERED STUDENTS</th>
              <th>NO. OF STUDENTS PASSED</th>
              <th>PASS PERCENTAGE</th>
              <th>REMARKS</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
          </tbody>
        </table>
      </section>

      {/* ================= E : SCHOOL INFRASTRUCTURE ================= */}
      <section className="section">
        <h3>E : SCHOOL INFRASTRUCTURE</h3>
        <table className="disclosure-table">
          <thead>
            <tr><th>SL No.</th><th>INFORMATION</th><th>DETAILS</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>TOTAL CAMPUS AREA OF THE SCHOOL (IN SQ MTR)</td><td>54,227</td></tr>
            <tr><td>2</td><td>NO. AND SIZE OF THE CLASS ROOMS (IN SQ MTR)</td><td>60 & 500</td></tr>
            <tr><td>3</td><td>NO. AND SIZE OF LABORATORIES INCLUDING COMPUTER LABS (IN SQ MTR)</td><td>10 & 600</td></tr>
            <tr><td>4</td><td>INTERNET FACILITY</td><td>YES</td></tr>
            <tr><td>5</td><td>NO. OF GIRLS TOILETS</td><td>10</td></tr>
            <tr><td>6</td><td>NO. OF BOYS TOILETS</td><td>12</td></tr>
            <tr>
              <td>7</td>
              <td>LINK OF YOUTUBE VIDEO OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE OF THE SCHOOL</td>
              <td><a href="https://youtu.be/DWYojazQ-9g" target="_blank" rel="noopener noreferrer">https://youtu.be/DWYojazQ-9g</a></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default MandatoryDisclosure;

