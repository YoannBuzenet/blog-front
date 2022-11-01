import axios from "axios";
import { routes } from "../../routing/routes";

export default async function handler(req, res) {
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
      try {
        const respServer = await axios.post(
          routes.api.entities.answer.post,
          req.body.payload
        );
        console.log("SUCCESS - Création Answer: " + respServer);
        return res.status(200).json("Success");
      } catch (e) {
        console.error("ERROR:" + e);
        return res.status(500).json("Error");
      }
      break;
    default:
      return res.status(400).json({
        name: "action parameter not found. Action received: " + body.action,
      });
  }

  return res.status(400).json("Request problem.");
}
