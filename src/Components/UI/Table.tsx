import { useState } from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Link } from 'react-router-dom';

interface Props {
  jobTitle: string;
  score: number;
  sections: {
    generalInfo: {
      Name: string;
      Email: string;
      Phone: string;
      GitHub?: string;
      LinkedIn?: string;
    }[];
  };
  filename: string;
}

interface TableProps {
  props: Props[];
}

export const Table = ({props}: TableProps) => {
    const [url,setUrl] = useState('')
    console.log(props);
    console.log(url);
    
    return(
        <div className="overflow-x-auto w-screen">
        <table className="table-auto w-full">
          <thead className="bg-gray-100">
            <tr className='text-black'>
              <th className='px-4 py-2 text-left'>Job Title</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className='px-4 py-2 text-left'>Socials</th>
              <th className="px-4 py-2 text-left">view</th>
            </tr>
          </thead>
          <tbody>
            {props.map((item, index:number) => (
              <tr key={index} className="border-b border-gray-200">
                <td className='px-4 py-2'>{item.jobTitle}</td>
                <td className="px-4 py-2">{item.score}</td>
                <td className="px-4 py-2">{item.sections.generalInfo[0].Name}</td>
                <td className="px-4 py-2">{item.sections.generalInfo[0].Email}</td>
                <td className="px-4 py-2">{item.sections.generalInfo[0].Phone}</td>
                <td className='px-4 py-2 flex'>
                  {item.sections.generalInfo[0]?.GitHub && (
                  <a href={`https://${item.sections.generalInfo[0]?.GitHub}`} target="_blank">
                    <img className='w-6' src='https://img.icons8.com/?size=100&id=62856&format=png&color=FFFFFF' alt='Github'/>
                  </a>
                  )}
                  {item.sections.generalInfo[0].LinkedIn && (
                    <a href={`https://${item.sections.generalInfo[0]?.LinkedIn}`} target='_blank'>
                    <img className='w-6' src='https://img.icons8.com/?size=100&id=13930&format=png&color=000000' alt='linkedin'/>
                  </a>
                  )}
                </td>
                <td className="px-4 py-2 text-blue-500">
                  <Link to={`/view/${item.filename}`} onClick={() => setUrl(item.filename)} target='blank'>
                    click me
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}




//resume analysing and ATS Score Calculation, suggestions from gemini,  job recomendationsbased on resume use indeed to show jobs.