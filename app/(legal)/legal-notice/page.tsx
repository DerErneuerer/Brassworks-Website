export default function LegalPage() {
  return (
    <div className="container text-gray-200 p-6 sm:p-10">
      <p className="my-4">
        <a href="https://572.at" className="text-green-600 hover:underline">
          https://572.at
        </a>
      </p>

      <ul className="list-none my-4">
        <li>572 Hosting e.K.</li>
        <li>[Your Address]</li>
        <li>[City, Postal Code]</li>
        <li>Germany</li>
      </ul>
      <ul className="list-none">
        <li>Email: <a href="mailto:info@572.at" className="text-green-600 hover:underline">info@572.at</a></li>
      </ul>

      <ul className="list-none my-4">
        <li>Registered as 572 Hosting e.K.</li>
        <li>VAT No.: [Insert VAT Number]</li>
        <li>Authorized Representative: [Insert Name]</li>
      </ul>

      <p className="my-4">
        The European Commission provides an online platform for dispute resolution. You can access the platform at{" "}
        <a
          href="http://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          http://ec.europa.eu/consumers/odr
        </a>.
        We are neither willing nor obliged to participate in a dispute resolution procedure before a consumer arbitration board.
      </p>

      <p className="my-4">
        572 Hosting is a commercial service that generates revenue to support the activities of the 572 Organisation. The income from the hosting service flows into the organisation's ongoing initiatives.
      </p>

      <p className="my-4">
        The 572 Organisation manages 572 Hosting. However, please note that the 572 Organisation is not legally responsible for 572 Hosting. The company itself is a registered sole trader (e.K.).
      </p>

      <p className="my-4">
        This email is exclusively for communication in accordance with Regulation (EU) 2021/784. Other requests will not be answered.<br />
        E-mail:{" "}
        <a href="mailto:tco@572.at" className="text-green-600 hover:underline">
          tco@572.at
        </a>
        ; Communication language: German, English
      </p>

      <p className="my-4">
        Requests from authorities that are not under Regulation (EU) 2021/784 (see above) can be sent to the following email, unless other contact channels have been established:<br />
        E-mail:{" "}
        <a href="mailto:dsa-authorities@572.at" className="text-green-600 hover:underline">
          dsa-authorities@572.at
        </a>
        ; Communication language: German, English
      </p>

      <p className="my-4">
        Content responsibility lies with the owner of 572 Hosting e.K.<br />
        Contact via email as listed above.
      </p>
    </div>
  );
}