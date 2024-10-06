import Tesseract from "tesseract.js";
import fs from "fs";
import parseExtractedText from "../utils/textParser.js";
import { Client } from "../models/client.model.js";


////// Controller to get all the clients data from DB //////

export const getClients = async(req, res) => {

    const clients = await Client.find();

    res.status(200).json(clients);
}


////// Controller to upload the card and save parsed text data to DB //////

export const uploadCard = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        //Extracting data from card image using tesseract.js library
    
        const imagePath = req.file.path;
    
        const { data: { text } } = await Tesseract.recognize(
            imagePath,
            'eng',
            {
                //logger: info => console.log(info) // Optional: Log progress
            }
        )

        fs.unlinkSync(imagePath);   //deleting the card image once the text is extracted

        if(text === "" || text === null){
            return res.status(400).json({ error: 'Invalid card' });
        }

        const parsedText = parseExtractedText(text);    //function call for parsing the data from text obtained :: function defined in utils

        const client = await Client.create({
            name: parsedText.name,
            jobTitle: parsedText.jobTitle,
            company: parsedText.company,
            email: parsedText.email,
            phoneNumber: parsedText.phone,
            address: parsedText.address
        })
    
        if(!client){
            return res.status(400).json({ error: 'Something went wrong while parsing text from card.' });
        }
        
        res.status(201).json(client);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing the image' });
    }
}