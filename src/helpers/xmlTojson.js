import { XMLParser } from 'fast-xml-parser';
import file1 from '../../public/file1.xml'; // Import the XML file
const parseXMLFiles = async () => {

    console.log("FILE");
    console.log(file1);
    const xmlFiles = [file1];
    const parser = new XMLParser();


    // const jsonData = xmlFiles.map((file) => {
    //   // Fetch file content and parse
    //   return fetch(file)
    //     .then((response) => response.text())
    //     .then((xmlText) => parser.parse(xmlText)); // Parse XML to JSON
    // });

    // Wait for all files to be parsed
    // const results = await Promise.all(jsonData);
    // console.log(results)
  };

  parseXMLFiles().then(()=>{
    console.log("asasda");
}).catch((err)=>{
    console.log(err);
})