import { useEffect, useState } from "react"
import "../css/Faq.css"
import {  SearchOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useTranslation } from "react-i18next";
import i18n from "i18next";


const questions = [
    {
        id: 1,
        questionFi: 'Miksi kannattaa valita Laatulakin ylioppilaslakki?',
        questionEn: "Why should you choose Laatulak's student cap?",
        questionSe: 'Varför ska du välja Laatulaks studentmössa?',
        answerFi: 'Valitsemalla Laatulakin ylioppilaslakin tuet nuorta pienyrittäjää ja kehitysmaiden lasten ja nuorten koulutusta. Laatulakki on pienyritys, jonka toimitusjohtaja Rohullah Karimi on tullut Suomeen turvapaikanhakijana vuonna 2016. Kotimaassaan Afganistanissa hän näki, että koulutus ei ole kaikille itsestäänselvyys ja siksi koulutus on hänelle erityisesti sydäntä lähellä ja tästä syystä 5 % Laatulakin vuosituotosta lähetetään Punaisen Ristin kautta kehitysmaiden lasten ja nuorten koulutuksen tukemiseen. Samalla kun teemme hyvää niin haluamme tarjota asiakkaillemme laadukkaan ja edullisen ylioppilaslakin, jonka opiskelija voi ylpeänä laittaa päähänsä valmistujaisissaan. Haluamme, että asiakkaamme tuntevat olonsa erityisiksi ja siksi pakkaamme jokaisen yo-lakin kauniisti ennen lähetystä. Lisäksi lähetämme tilauksia viikon jokaisena päivänä, joten saat ylioppilaslakkisi nopeasti, eikä sinun tarvitse odottaa viikkoja lakin valmistumista.',
        answerEn: "By choosing Laatulak's student law, you support a young small entrepreneur and the education of children and young people in developing countries. Laatulakki is a small company whose CEO Rohullah Karimi came to Finland as an asylum seeker in 2016. In his home country of Afghanistan, he saw that education is not a given for everyone and that is why education is especially close to his heart and for this reason 5% of Laatulakki's annual income is sent through the Red Cross to the education of children and young people in developing countries to support. While doing good, we also want to offer our customers a high-quality and affordable graduation cap that students can proudly wear at their graduation ceremony. We want our customers to feel special and that's why we package each yo-cap beautifully before shipping. In addition, we send orders every day of the week, so you will receive your graduation cap quickly, and you don't have to wait weeks for the cap to be ready.",
        answerSe: "Genom att välja Laatulaks studentjuridik stödjer du en ung småföretagare och utbildning av barn och unga i utvecklingsländer. Laatulakki är ett litet företag vars vd Rohullah Karimi kom till Finland som asylsökande 2016. I hemlandet Afghanistan såg han att utbildning inte är självklart för alla och det är därför utbildning ligger honom särskilt varmt om hjärtat och för detta. anledning 5% av Laatulakkis årliga inkomst skickas via Röda Korset till utbildning av barn och unga i utvecklingsländer för att stödja. Samtidigt som vi gör gott vill vi också erbjuda våra kunder en högkvalitativ och prisvärd examensmössa som studenterna stolt kan bära vid sin examensceremoni. Vi vill att våra kunder ska känna sig speciella och det är därför vi förpackar varje yo-cap vackert innan frakt. Dessutom skickar vi beställningar alla dagar i veckan, så du får din examensmössa snabbt och du behöver inte vänta flera veckor på att kepsen är klar.",
    },
    {
        id: 2,
        questionFi: 'Milloin kannattaa tilata ylioppilaslakki?',
        questionEn: 'When should you order a graduation cap?',
        questionSe: 'När ska du beställa en examensmössa?',
        answerFi: 'Ylioppilaslakin tilaamisen ajankohta riippuu siitä, milloin ylioppilaskirjoitukset ovat ja milloin valmistujaisjuhlat järjestetään. Usein ylioppilaslakin tilaaminen kannattaa tehdä hyvissä ajoin ennen valmistujaisjuhlia, jotta lakkia ei tarvitse tilata kiireessä ja riski mahdolliselle viivästykselle vähenee. Laatulakki kuitenkin toimittaa tilauksia viikon jokaisena päivänä postin aukioloaikojen mukaisesti ja tästä syystä saat tilaamasi ylioppilaslakin käyttöösi jo muutaman päivän sisällä tilauksestasi!',
        answerEn: "The timing of ordering the student ID depends on when the student documents are due and when the graduation party is held. It is often advisable to order a graduation cap well in advance of the graduation party, so that the cap does not have to be ordered in a hurry and the risk of a possible delay is reduced. However, Laatulakki delivers orders every day of the week according to the post office's opening hours, and for this reason you can use the student cap you ordered within a few days of your order!",
        answerSe: "Tidpunkten för beställning av studentlegitimationen beror på när studenthandlingarna ska lämnas in och när examensfesten hålls. Ofta är det lämpligt att beställa en examensmössa i god tid innan examensfesten, så att kepsen inte behöver beställas i all hast och risken för en eventuell försening minskar. Laatulakki levererar dock beställningar alla dagar i veckan enligt postens öppettider och därför kan du använda studentmössan du beställt inom några dagar efter din beställning!",
    },
    {
        id: 3,
        questionFi: 'Mistä tiedän minkä kokoinen ylioppilaslakki minun pitää valita?',
        questionEn: 'How do I know what size graduation cap I should choose?',
        questionSe: "Hur vet jag vilken storlek examensmössa jag ska välja?",
        answerFi: 'Ylioppilaslakki valitaan päänympärysmitan mukaan. Mittaa päänympäryksesi senttimetreinä otsalta, korvien yläpuolelta takaraivolle asti ja pyydä tarvittaessa kaveria tai vanhempaa apuun. Laatulakin verkkokaupan koot vastaavat päänympäryksen senttimetrejä. On tärkeää, että ylioppilaslakki istuu hyvin päähän eikä ole liian tiukka tai liian löysä. Lakin pitää pysyä päässä ilman, että se puristaa tai valuu liikaa. Mikäli päänympärysmitta on kahden koon välissä, on hyvä valita hieman isompi koko, esimerkiksi jos mitattu päänympärys on 56,4 cm, sinun kannattaa valita yo-lakki koossa 57. On parempi valita hieman isompi koko myös siitä syystä, että vuosien kuluessa pää yleensä vielä hieman kasvaa. Mikäli vahingossa tilaat väärän kokoisen lakin voit halutessasi palauttaa lakin ja vaihtaa sen sopivaan. Laatulakin verkkosivuilta on myös mahdollista tilata korkkiliuskoja, joilla saat hieman liian isosta lakista sopivan kokoisen. Jos olet epävarma lakin oikeasta koosta, kannattaa kysyä neuvoa info@laatulakki.fi. Me autamme sinua mielellämme oikean kokoisen lakin valinnassa.',
        answerEn: "The student cap is chosen according to the head circumference. Measure your head circumference in centimeters from the forehead, above the ears to the nape of the neck and, if necessary, ask a friend for help. The sizes in the quality cap online store correspond to head circumference centimeters. It is important that the student cap fits well on the head and is not too tight or too loose. The cap must stay on the head without squeezing or dripping too much. If the head circumference is between two sizes, it is good to choose a slightly larger size, for example, if the measured head circumference is 56.4 cm, you should choose a yo-cap in size 57. It is better to choose a slightly larger size also because over the years the head usually grows a little more. If you accidentally order the wrong size cap, you can return the cap and exchange it for a suitable one. From Laatulakki's website, it is also possible to order cap strips with which you can get a cap that is a little too big into a suitable size. If you are unsure about the right size of a cap, you should ask for advice at info@laatulakki.fi. We will be happy to help you choose the right size cap.",
        answerSe: "Studentmössan väljs efter huvudets omkrets. Mät huvudomkretsen i centimeter från pannan, ovanför öronen till nacken och be vid behov en vän om hjälp. Storlekarna i kvalitetskeps onlinebutiken motsvarar huvudomkrets centimeter. Det är viktigt att studentmössan sitter bra på huvudet och inte sitter för hårt eller för löst. Kepsen måste sitta på huvudet utan att klämma eller droppa för mycket. Om huvudomkretsen ligger mellan två storlekar är det bra att välja en lite större storlek, om den uppmätta huvudomkretsen är 56,4 cm ska du välja en yo-keps i storlek 57. Det är bättre att välja en lite större storlek också för att huvudet med åren oftast växer lite mer. Om du av misstag beställer keps i fel storlek kan du returnera kepsen och byta ut den mot en lämplig. Från Laatulakkis hemsida går det även att beställa kepsremsor med vilka man kan få en lite för stor keps till en passande storlek, är du osäker på rätt storlek på keps bör du fråga om råd på info@ laatulakki.fi. Vi hjälper dig gärna att välja rätt storlek på kepsen.",
    },
    {
        id: 4,
        questionFi: 'Kuinka paljon ylioppilaslakki maksaa?',
        questionEn: 'How much does a student cap cost?',
        questionSe: 'Hur mycket kostar en studentkeps?',
        answerFi: 'Useat eri tekijät voivat vaikuttaa ylioppilaslakin hintaan, kuten lakin malli, materiaalit ja valmistaja. Yleisesti ottaen yksinkertaisemmat ja perinteisemmät lakkimallit ovat halvempia kuin erikoisemmat tai moderneimmat mallit. Laatulakki-verkkokaupasta saat laadukkaista materiaaleista valmistetun perinteisen suomalaisen ylioppilaslakin erittäin edulliseen hintaan 44,90 €.',
        answerEn: "Several different factors can affect the price of a student cap, such as the model, materials and manufacturer of the cap. In general, simpler and more traditional cap models are cheaper than more special or modern models. From the Laatulakki online store, you can get a traditional Finnish student cap made of high-quality materials at a very affordable price of €44.90.",
        answerSe: "Flera olika faktorer kan påverka priset på en studentmössa, såsom modell, material och tillverkare av kepsen. Generellt sett är enklare och mer traditionella kepsmodeller billigare än mer speciella eller moderna modeller. Från Laatulakkis onlinebutik kan du få en traditionell finsk studentkeps gjord av högkvalitativa material till ett mycket överkomligt pris på 44,90 €.",
    },
    {
        id: 5,
        questionFi: 'Miten puhdistan ylioppilaslakin?',
        questionEn: 'How do I clear the student code?',
        questionSe: 'Hur rensar jag studentkoden?',
        answerFi: 'Kenties olet nähnyt isovanhempiesi kellastuneen ylioppilaslakin? Elämän jäljet ja kellastuminen kuuluvat ylioppilaslakin elinkaareen, mutta lakkia voi myös halutessaan puhdistaa samettiharjalla kevyesti harjaten tai vaahtomuovin palalla ja tahranpoistoaineella. Lakki kannattaa kuitenkin säilyttää omassa laatikossaan, sillä se suojaa yo-lakkia pölyltä. Sormenjäljet lipasta saat pyyhittyä puhtaalla puuvillakankaalla tai neutraalilla saippuaveteen kostutetulla liinalla. Ylioppilaslakkia ei tule kuitenkaan pestä pesukoneessa tai liottaa. Jos ylioppilaslakkisi kuitenkin kastuu, niin anna sen kuivua vuorokausi huoneenlämmössä ennen laatikkoon laittamista.',
        answerEn: "Perhaps you have seen your grandparents' yellowed graduation cap? The traces of life and distribution are part of the student cap's life cycle, but the cap can also be cleaned if desired by lightly brushing with a velvet brush or with a piece of foam and stain remover. However, you should keep the cap in its own box, because it protects the yo-cap from dust. You can wipe fingerprints from the magazine with a clean cotton cloth or a neutral cloth moistened with soapy water. However, the student cap cannot be washed in the washing machine or soaked. However, if your graduation cap gets wet, let it dry for a day at room temperature before putting it in the box.",
        answerSe: "Du kanske har sett dina farföräldrars gulnade examensmössa? Spåren av liv och distribution är en del av studentmössans livscykel, men kepsen kan även rengöras om så önskas genom att lätt borsta med en sammetsborste eller med en bit skum och fläckborttagningsmedel. Dock bör du ha kepsen i sin egen låda, eftersom den skyddar yo-kepsen från damm. Du kan torka av fingeravtryck från tidningen med en ren bomullstrasa eller en neutral trasa fuktad med tvålvatten. Studentmössan kan dock inte tvättas i tvättmaskin eller blötläggas. Men om din examensmössa blir blöt, låt den torka en dag i rumstemperatur innan du lägger den i lådan.",
    },
    {
        id: 6,
        questionFi: 'Miksi ylioppilaslakkia käytetään vappuna?',
        questionEn: 'Why is a student cap worn on May Day?',
        questionSe: 'Varför bärs en studentmössa på första maj?',
        answerFi: 'Ylioppilaslakin käyttö vappujuhlissa juontaa juurensa 1900-luvun alkuun, jolloin opiskelijat alkoivat juhlistaa vappua ylioppilaslakin kanssa. Vappu oli jo tuolloin suosittu juhla, mutta ylioppilaslakin käyttö vapun juhlintaan alkoi levitä ensin Helsingin yliopistosta muihin yliopistoihin ja myöhemmin myös muihin oppilaitoksiin. Tästä lähtien ylioppilaslakki on ollut osa suomalaista vappuperinnettä. Vappu on työväen ja kevään saapumisen juhla. Ylioppilaslakin käyttö vappuna edustaa akateemisia arvoja ja symboloi opiskelijaelämää, sekä sitä, että opiskelija on suorittanut lukion oppimäärän ja valmistunut ylioppilaaksi. Vappuna järjestetään usein erilaisia juhlia ja tapahtumia, joissa ylioppilaslakin käyttö on yleistä. Tämä juhla on perinteisesti yhdistetty opiskelijoiden juhlaan, ja juuri ylioppilaslakki on ollut opiskelijoiden tunnusmerkki. Vappuna opiskelijat ovat usein järjestäneet puistojuhlia, piknikkejä, kulkueita ja muita tapahtumia, ja ylioppilaslakki on ollut näissä juhlissa yleinen näky sekä nuorilla että vanhemmilla ylioppilastutkinnon suorittaneilla.',
        answerEn: "The use of the student cap at May Day celebrations dates back to the beginning of the 20th century, when student workers celebrated May Day with the student cap. May Day was already a popular holiday at that time, but the use of the Student Act to celebrate May Day began to spread first from the University of Helsinki to other universities and later also to other educational institutions. Since then, the student cap has been part of the Finnish May Day tradition. May Day is a celebration of working people and the arrival of spring. The use of the student cap on May Day represents academic values and symbolizes student life, as well as the fact that the student has completed the high school curriculum and graduated as a high school student. Various parties and events are often organized on May Day, where the use of the student cap is common. This celebration is traditionally connected to the students' celebration, and the graduation cap has been the hallmark of the students. On Vappu, students have often organized park parties, picnics, parades and other events, and the graduation cap has been a common sight at these parties for both young and older graduates.",
        answerSe: "Användningen av studentmössan vid första maj-firandet går tillbaka till början av 1900-talet, då studentarbetarna firade första maj med studentmössan. Första första maj var redan då en populär högtid, men användningen av studentlagen för att fira första maj började spridas först från Helsingfors universitet till andra universitet och senare även till andra läroanstalter. Sedan dess har studentmössan varit en del av den finska första maj-traditionen, första maj är ett firande av arbetande människor och vårens ankomst. Användningen av studentkepsen på första maj representerar akademiska värderingar och symboliserar studentlivet, liksom det faktum att studenten har slutfört gymnasiet och tagit examen som gymnasieelev. Olika fester och evenemang anordnas ofta på första maj, där användningen av studentmössan är vanligt. Detta firande är traditionellt kopplat till elevernas firande och examensmössan har varit elevernas signum.På Vappu har eleverna ofta anordnat parkfester, picknickar, parader och andra evenemang och examensmössan har varit en vanlig syn kl. dessa fester för både unga och äldre akademiker.",
    },
    {
        id: 7,
        questionFi: 'Miksi ylioppilaslakissa on lyyra?',
        questionEn: 'Why is there a lyre in the student act?',
        questionSe: 'Varför finns det en lyra i studentakten?',
        answerFi: 'Ylioppilaslakin lyyra on symboliikaltaan antiikin Kreikan ajoilta peräisin oleva merkki, joka edustaa oppineisuutta, tiedonhalua ja korkeaa koulutusta. Lyyran symboliikka liittyy myös musiikkiin ja runouteen, koska antiikin Kreikassa lyyra oli yksi tärkeimmistä soittimista ja se liitettiin myös runouteen ja laulamiseen. Lyyran käyttö ylioppilaslakissa juontaa juurensa 1800-luvun Suomeen, jolloin Suomen ylioppilaskunta alkoi käyttää lyyraa yhtenä tunnuksenaan. Ylioppilaslakkien yleistymisen myötä lyyrasta tuli myös osa lakkia, jolloin se symboloi ylioppilaiden oppineisuutta ja sivistystä. Tänä päivänä ylioppilaslakin lyyra on yhä tärkeä symboli suomalaisessa yhteiskunnassa ja se edustaa ylioppilaiden korkeaa koulutusta ja akateemista osaamista. Lyyra on siis arvokas symboli, joka kuvastaa ylioppilaiden opiskelun ja ponnistelujen tulosta sekä heidän pyrkimystään jatkaa oppimista ja kehittymistä myös tulevaisuudessa.',
        answerEn: 'The lyre of the student cap is a symbol originating from the times of ancient Greece, which represents erudition, the desire for knowledge and high education. The symbolism of the lyre is also related to music and poetry, because in ancient Greece the lyre was one of the most important musical instruments and it was also associated with poetry and singing. The use of the lyre in the student law dates back to 19th-century Finland, when the Finnish student union started using the lyre as one of its emblems. As student caps became more common, Lyra also became a part of the cap, symbolizing the students learning and culture. Today, the Lyre of the student law is still an important symbol in Finnish society and it represents the high education and academic competence of students. The lyre is therefore a valuable symbol that reflects the result of the students studies and efforts, as well as their efforts to continue learning and developing in the future as well.',
        answerSe: 'Lyran på studentmössan är en symbol som härstammar från det antika Greklands tid, som representerar lärdom, lust efter kunskap och hög utbildning. Lyrans symbolik är också relaterad till musik och poesi, eftersom lyran i antikens Grekland var ett av de viktigaste musikinstrumenten och den förknippades också med poesi och sång. Användningen av lyran i studenträtten går tillbaka till 1800-talets Finland, då den finska studentkåren började använda lyran som ett av sina emblem. I takt med att studentmössor blev vanligare blev Lyra också en del av kepsen, som symboliserar elevernas lärande och kultur. Studentlagens lyra är idag fortfarande en viktig symbol i det finländska samhället och den representerar studenters höga utbildning och akademiska kompetens. Lyran är därför en värdefull symbol som speglar resultatet av elevernas studier och ansträngningar, samt deras ansträngningar att fortsätta lära och utvecklas även i framtiden.'
    },
    {
        id: 8,
        questionFi: 'Pitääkö lyyra ostaa erikseen?',
        questionEn: 'Does Lyyra have to be bought separately?',
        questionSe: 'Måste Lyyra köpas separat?',
        answerFi: 'Ei. Laatulakin ylioppilaslakissa on valmiiksi kiinnitettynä 16x16 mm kokoinen kullattu lyyra, joten sinun ei tarvitse ostaa sitä erikseen.',
        answerEn: "No. The student cap of the quality cap has a 16x16 mm gold-plated lyre already attached, so you don't have to buy it separately.",
        answerSe: 'Nej. Studentmössan på kvalitetskepsen har en 16x16 mm guldpläterad lyra redan fastsatt, så du behöver inte köpa den separat.'
    },
    


   
]



function FAQ(props) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchChange = e => {
        setSearchTerm(e.target.value);
    };
    
    

    useEffect(() => {
        const selectedLang = i18n.language
        const results = props.data.filter(item => {

            // language 
            var questionML = item.questionFi;
            if(selectedLang === "en"){
                questionML = item.questionEn;
            }else if(selectedLang === "se"){
                questionML = item.questionSe;
            }else{
                questionML = item.questionFi;
            }

            return questionML.toLowerCase().includes(searchTerm)
        });

        setSearchResults(results);
    }, [searchTerm, props.data]);

    return (
        <div className='container faqCotainer'>
            <div className="faqHeader">
                <h2 className="heading">{t('faq_1')}</h2>
            </div>
            <Searchbar onSearchChange={handleSearchChange} />
            <section className='faq'>
                {searchResults.map(item => {
                    const selectedLang = i18n.language
                    // language 
                    var questionML = item.questionFi;
                    var answerML = item.answerFi;
                    if(selectedLang === "en"){
                        questionML = item.questionEn;
                        answerML = item.answerEn;
                    }else if(selectedLang === "se"){
                        questionML = item.questionSe;
                        answerML = item.answerSe;
                    }else{
                        questionML = item.questionFi;
                        answerML = item.answerFi;
                    }
                    return <Question key={item.id} question={questionML} answer={answerML} />
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