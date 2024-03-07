import React from 'react'; // Make sure you have this import
import { useEffect, useState } from "react"
import "../css/Faq.css"
import {  SearchOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useTranslation } from "react-i18next";
import {Helmet} from "react-helmet";
import axios from "axios"


function FAQ(props) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchChange = e => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const results = props.data.filter(item => {
            var questionML = item.title;

            return questionML.toLowerCase().includes(searchTerm)
        });

        setSearchResults(results);
    }, [searchTerm, props.data]);


    
    return (
        <div className='container faqCotainer'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Usein Kysyttyjä Kysymyksiä - LAATULAKKI - YLIOPPILASLAKKI</title>
                <meta name="description" content="Usein kysyttyihin kysymyksiin yo-lakeista ja ABI-tuotteista löydät vastaukset FAQ:stamme. Tarvittaessa asiakaspalvelumme on valmiina auttamaan sinua kysymyksissäsi." />
            </Helmet>

            <div className="faqHeader">
                <h2 className="heading">{t('faq_1')}</h2>
            </div>
            <Searchbar onSearchChange={handleSearchChange} />
            <section className='faq'>
                {searchResults.map((item, index) => {
                    var questionML = item.title;
                    var answerML = item.body;
                    var indexId = `${item.id}_${index}`; // Combining item.id with index for uniqueness

                    return <Question key={indexId} question={questionML} answer={answerML} />;
                })}
            </section>
        </div>
    )
}

const Searchbar = props => {
    const { t } = useTranslation();
    const [value, setValue] = useState('')
    const handleChange = (e) => {
        setValue(e.target.value)
        props.onSearchChange(e)
    }
    return (
        <form className="faqForm">
            <SearchOutlined style={{
                height: "1.5rem",
                fill: "#9EA6AE",
                position: "absolute",
                width: "4rem"
            }}/>
            <input className='searchbar' type='text' placeholder={t('faq_0')} onChange={handleChange} value={value} />
        </form>
    )
}

const Question = props => {
    const [isActive, setActive] = useState(false);
    const handleClick = (id) => {
        setActive(!isActive)
    }
    return (
        <div className="question-wrapper" key={props.id}>
            <div className='question' id={props.id}>
                <h4>{props.question}</h4>
                <button className="faqButton" onClick={() => handleClick(props.id)}>
                    {!isActive ? <KeyboardArrowUpOutlined  style={{height: "1.5rem",fill: "#9EA6AE",position: "absolute", width: "4rem"}}/> :  <KeyboardArrowDownOutlined  style={{height: "1.5rem",fill: "#9EA6AE",position: "absolute", width: "4rem"}}/>}
                </button>
            </div>
            <div className={isActive ? 'answer' : 'answer active'}>{props.answer}</div>
        </div>
    )
}


  

const FaqReturn = () => {

    const [posts, setPosts] = useState([]);

  
    useEffect(() =>{
        const getBlogs = async ()=>{
          try{
            const res = await axios.get(
              process.env.REACT_APP_API_URL+`/blog`
            );
            setPosts(res.data);
          }catch(err){
            console.log(err)
          }
        };
        getBlogs()
    },[]);


    
    const filteredBlogs = posts
    .filter(blog => blog.title.includes("?"))
    .map(blog => {
        let plainTextBody = '';

        if (Array.isArray(blog.body)) {
            plainTextBody = blog.body.reduce((acc, block) => {
                if (block._type === "block" && block.children) {
                    acc += block.children.map(child => child.text).join(" ");
                }
                return acc;
            }, "");
        } else if (typeof blog.body === 'string') {
            plainTextBody = blog.body;
        } else {
            // Handle other data types if necessary
        }

        const id = blog.slug && blog.slug.current ? blog.slug.current : '';

        return {
            title: blog.title,
            id: id,
            body: plainTextBody
        };
    });

    return (
        <div>
            <Navbar/>
                <FAQ data={filteredBlogs}/>

            <Footer/>
        </div>
    )
}
export default FaqReturn