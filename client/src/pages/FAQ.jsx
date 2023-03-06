import { useEffect, useState } from "react"
import "../css/Faq.css"
import {  SearchOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"


const questions = [
    {
        id: 1,
        question: 'Popular Articles',
        answer: 'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
    },
    {
        id: 2,
        question: 'Fix problems & request removals',
        answer: 'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
    },
    {
        id: 3,
        question: 'Browse the web',
        answer: 'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
    },
    {
        id: 4,
        question: 'Search on your phone or tablet',
        answer: 'Suspendisse ipsum elit, hendrerit id eleifend at, condimentum et mauris. Curabitur et libero vel arcu dignissim pulvinar ut ac leo. In sit amet orci et erat accumsan interdum.',
    },

]

function FAQ(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchChange = e => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const results = props.data.filter(item =>
            item.question.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm, props.data]);

    return (
        <div className='container'>
            <h2 className="heading">How can we help you?</h2>
            <Searchbar onSearchChange={handleSearchChange} />
            <section className='faq'>
                {searchResults.map(item => <Question key={item.id} question={item.question} answer={item.answer} />)}
            </section>
        </div>
    )
}

const Searchbar = props => {
    const [value, setValue] = useState('')
    const handleChange = (e) => {
        setValue(e.target.value)
        props.onSearchChange(e)
    }
    return (
        <form>
            <SearchOutlined style={{
                height: "1.5rem",
                fill: "#9EA6AE",
                position: "absolute",
                width: "4rem"
            }}/>
            <input className='searchbar' type='text' placeholder='Describe your issue' onChange={handleChange} value={value} />
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
                    {isActive ? <KeyboardArrowUpOutlined  style={{height: "1.5rem",fill: "#9EA6AE",position: "absolute", width: "4rem"}}/> :  <KeyboardArrowDownOutlined  style={{height: "1.5rem",fill: "#9EA6AE",position: "absolute", width: "4rem"}}/>}
                </button>
            </div>
            <div className={isActive ? 'answer active' : 'answer'}>{props.answer}</div>
        </div>
    )
}


const FaqReturn = () => {
    return (
        <div>
            <Navbar/>
            <FAQ data={questions}/>
            <Footer/>
        </div>
    )
}
export default FaqReturn