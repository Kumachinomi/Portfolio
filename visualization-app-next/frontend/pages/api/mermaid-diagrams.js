import axios from "axios";

const handler = async(req, res) => {
    if(!['GET','POST'].includes(req.method)){
        return res.status(405).end();
    }

    const DJANGO_API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000/api/mermaid-diagrams/'
  : `${process.env.NEXT_PUBLIC_API_URL}/api/mermaid-diagrams/`;

    try{
        if (req.method === 'POST'){
            const response = await axios.post(DJANGO_API_URL, req.body);
            return res.status(200).json(response.data);
        }

        if(req.method === 'GET'){
            const response = await axios.get(DJANGO_API_URL);
            return res.status(200).json(response.data);
            
        }
        } catch (error) {
            return res.status(500).json({ error: 'Server error' });
        }
    };

export default handler;



