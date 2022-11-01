export default function handler(req, res) {
  // TODO
  // Réception requete
  // ping avec axios qui ajoute la passphrase en header

  const { body } = req;

  if (!body?.action) {
    return res.status(400).json("action parameter is missing");
  }

  switch (body.action) {
    // Creating a post
    case "post":
      // Post req.body to back end directly with axios + passPhrase
      break;
    default:
      return res.status(400).json({
        name: "action parameter not found. Action received: " + body.action,
      });
  }

  return res.status(200).json({ name: "John Doe" });
}
