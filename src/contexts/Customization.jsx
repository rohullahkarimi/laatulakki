import { createContext, useContext, useState } from "react";

export const graduationCapCustomizationOptions = {
  title: [
    {
      fi: "Perinteinen suomalainen ylioppilaslakki",
      en: "Traditional Finnish student cap",
      se: "Traditionell finsk studentmössa",
    },
  ],
  desc: [
    {
      fi: "Perinteinen suomalainen ylioppilaslakki. Lakissa on kiinnitettynä kullattu 16x16 mm lyyra. Lakin päällikangas on korkealaatuista, vettä ja likaa hylkivää Brilliant-samettia. Lakin vuorikangas on sinivalkoista viskoosia. Hikinauha on nahkaa ja lippa on valmistettu tekonahasta. Mittaa päänympäryksesi huolellisesti, jotta pystyt valitsemaan juuri sinulle oikeankokoisen ylioppilaslakin. Ylioppilaslakki toimitetaan sopivan kokoisessa laatikossa, jossa sitä on helppo säilyttää.",
      en: "Traditional Finnish student cap. The cap has a gold-plated 16x16 mm lyre attached. The outer fabric of the cap is high-quality, water and dirt-repellent Brilliant velvet. The lining fabric of the cap is blue-white viscose. The sweatband is leather and the cap is made of artificial leather. Measure your head circumference carefully so that you can choose just for you the right-sized graduation cap. The graduation cap is delivered in an appropriately sized box, where it is easy to store.",
      se: "Traditionell finsk studentmössa. Kepsen har en guldpläterad 16x16 mm lyra fäst. Yttertyget på kepsen är av hög kvalitet, vatten- och smutsavvisande Briljant sammet. Fodertyget på kepsen är blåvit viskos. Den svettband är läder och kepsen är gjord av konstläder Mät din huvudomkrets noggrant så att du kan välja just för dig en examensmössa i rätt storlek Graduation-kepsen levereras i en passande stor kartong, där den är enkel att förvara. ",
    },
  ],
  img: [
    {
      original: "https://www.laatulakki.fi/images/graduation_cap/800/1.jpg",
      thumbnail: "https://www.laatulakki.fi/images/graduation_cap/200/1.jpg",
      originalAlt: "Ylioppilaslakki_vasemmasta_sivusta",
      thumbnailAlt: "Ylioppilaslakki_vasemmasta_sivusta",
    },
    {
      original: "https://www.laatulakki.fi/images/graduation_cap/800/2.jpg",
      thumbnail: "https://www.laatulakki.fi/images/graduation_cap/200/2.jpg",
      originalAlt: "Ylioppilaslakki_edestä",
      thumbnailAlt: "Ylioppilaslakki_edestä",
    },
    {
      original: "https://www.laatulakki.fi/images/graduation_cap/800/3.jpg",
      thumbnail: "https://www.laatulakki.fi/images/graduation_cap/200/3.jpg",
      originalAlt: "Ylioppilaslakki_läheltä",
      thumbnailAlt: "Ylioppilaslakki_läheltä",
    },
    {
      original: "https://www.laatulakki.fi/images/graduation_cap/800/5.jpg",
      thumbnail: "https://www.laatulakki.fi/images/graduation_cap/200/5.jpg",
      originalAlt: "Ylioppilaslakki_sisältä_läheltä",
      thumbnailAlt: "Ylioppilaslakki_sisältä_läheltä",
    },
    {
      original: "https://tester.laatulakki.fi/images/graduation_cap/800/6.jpg",
      thumbnail: "https://tester.laatulakki.fi/images/graduation_cap/200/6.jpg",
      originalAlt: "Ylioppilaslakki_sisältä",
      thumbnailAlt: "Ylioppilaslakki_sisältä",
    },
    {
      original:
        "https://www.laatulakki.fi/images/graduation_cap/800/malli_ylioppilaslakki_4.jpg",
      thumbnail:
        "https://www.laatulakki.fi/images/graduation_cap/200/malli_ylioppilaslakki_4.jpg",
      originalAlt: "Ylioppilaslakki_malli",
      thumbnailAlt: "Ylioppilaslakki_malli",
    },
    {
      original:
        "https://www.laatulakki.fi/images/graduation_cap/800/malli_ylioppilaslakki_5.jpg",
      thumbnail:
        "https://www.laatulakki.fi/images/graduation_cap/200/malli_ylioppilaslakki_5.jpg",
      originalAlt: "Ylioppilaslakki_malli",
      thumbnailAlt: "Ylioppilaslakki_malli",
    },
    {
      original: "https://www.laatulakki.fi/gif/packaging.GIF",
      thumbnail: "https://www.laatulakki.fi/gif/packaging.GIF",
      originalAlt: "Ylioppilaslakki_pakaaminen",
      thumbnailAlt: "Ylioppilaslakki_pakaaminen",
    },
    {
      original: "https://www.laatulakki.fi/images/email_banner/banner2.jpg",
      thumbnail: "https://www.laatulakki.fi/images/email_banner/banner2.jpg",
      originalAlt: "Ylioppilaslakki_ruusu_päällä",
      thumbnailAlt: "Ylioppilaslakki_ruusu_päällä",
    },
  ],
  categories: ["lakki", "ylioppilaslakki"],
  sizeFilter: [
    "52",
    "53",
    "54",
    "55",
    "55.5",
    "56",
    "56.5",
    "57",
    "57.5",
    "58",
    "58.5",
    "59",
    "59.5",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
  ],
  size: [
    {
      name: "52",
      unit: "cm",
      storage: 0,
    },
    {
      name: "53",
      unit: "cm",
      storage: 0,
    },
    {
      name: "54",
      unit: "cm",
      storage: 0,
    },
    {
      name: "55",
      unit: "cm",
      storage: 1,
    },
    {
      name: "55.5",
      unit: "cm",
      storage: 5,
    },
    {
      name: "56",
      unit: "cm",
      storage: 21,
    },
    {
      name: "56.5",
      unit: "cm",
      storage: 12,
    },
    {
      name: "57",
      unit: "cm",
      storage: 34,
    },
    {
      name: "57.5",
      unit: "cm",
      storage: 21,
    },
    {
      name: "58",
      unit: "cm",
      storage: 74,
    },
    {
      name: "58.5",
      unit: "cm",
      storage: 18,
    },
    {
      name: "59",
      unit: "cm",
      storage: 15,
    },
    {
      name: "59.5",
      unit: "cm",
      storage: 23,
    },
    {
      name: "60",
      unit: "cm",
      storage: 0,
    },
    {
      name: "61",
      unit: "cm",
      storage: 0,
    },
    {
      name: "62",
      unit: "cm",
      storage: 0,
    },
    {
      name: "63",
      unit: "cm",
      storage: 0,
    },
    {
      name: "64",
      unit: "cm",
      storage: 0,
    },
    {
      name: "65",
      unit: "cm",
      storage: 0,
    },
  ],
  colorFilter: ["valkoinen"],
  color: {
    fi: [
      {
        name: "Valkoinen",
      },
    ],
    se: [
      {
        name: "vit",
      },
    ],
    en: [
      {
        name: "White",
      },
    ],
  },
  details: {
    fi: [
      {
        name: "Päällinen",
        desc: "Valkoinen Brilliant-sametti",
      },
      {
        name: "Reuna",
        desc: "Musta Brilliant-sametti",
      },
      {
        name: "Vuori",
        desc: "Sinivalkoinen, 100 % viskoosi",
      },
      {
        name: "Lyyra",
        desc: "Lakki sisältää kullatun 16 x 16 mm lyyran",
      },
      {
        name: "Lippa",
        desc: "Tekonahka",
      },
      {
        name: "Hikinauha",
        desc: "Nahka, ruskea",
      },
      {
        name: "Hoito-ohje",
        desc: "Ei pestävä",
      },
    ],
    se: [
      {
        name: "Överst",
        desc: "White Brilliant Velvet",
      },
      {
        name: "Kant",
        desc: "Black Brilliant Velvet",
      },
      {
        name: "Berg",
        desc: "Blå gul vit, 100 % viskos",
      },
      {
        name: "Lyra",
        desc: "Guldpläterad 16 x 16 mm",
      },
      {
        name: "Lippa",
        desc: "Faux läder",
      },
      {
        name: "Svettband",
        desc: "Läder, brunt",
      },
      {
        name: "Skötselanvisningar",
        desc: "Ej tvättbar",
      },
    ],
    en: [
      {
        name: "Top",
        desc: "White Brilliant Velvet",
      },
      {
        name: "Edge",
        desc: "Black Brilliant Velvet",
      },
      {
        name: "Mountain",
        desc: "Blue yellow white, 100% viscose",
      },
      {
        name: "Lyra",
        desc: "Gold plated 16 x 16 mm",
      },
      {
        name: "Lippa",
        desc: "Faux Leather",
      },
      {
        name: "Sweatband",
        desc: "Leather, brown",
      },
      {
        name: "Care instructions",
        desc: "Not washable",
      },
    ],
  },
  price: 44.9,
  discount: 0,
  vatPercentage: 24,
  inStock: true,
  visibility: true,

  onOff: {
    badge: true,
    roundRibbonColor: true,
    cordColor: true,
    embroideryTextFront: true,
    embroideryTextBack: true,
  },
  badge: [
    {
      name: {
        fi: [
          {
            name: "suomi",
          },
        ],
        se: [
          {
            name: "fi",
          },
        ],
        en: [
          {
            name: "fi",
          },
        ],
      },
      price: 0,
      enabled: true,
      stock: 100,
    },
    {
      name: {
        fi: [
          {
            name: "kristalli",
          },
        ],
        se: [
          {
            name: "kristall",
          },
        ],
        en: [
          {
            name: "crystal",
          },
        ],
      },
      price: 8,
      enabled: true,
      stock: 100,
    },
    {
      name: {
        fi: [
          {
            name: "tähti",
          },
        ],
        se: [
          {
            name: "stjärna",
          },
        ],
        en: [
          {
            name: "star",
          },
        ],
      },
      price: 8,
      enabled: true,
      stock: 100,
    },
  ],
  roundRibbonColor: [
    {
      name: {
        fi: [
          {
            name: "kulta",
          },
        ],
        se: [
          {
            name: "guld",
          },
        ],
        en: [
          {
            name: "gold",
          },
        ],
      },
      color: "#ffcd59",
      price: 6,
      enabled: true,
      stock: 100,
    },
    {
      name: {
        fi: [
          {
            name: "hopea",
          },
        ],
        se: [
          {
            name: "silver",
          },
        ],
        en: [
          {
            name: "silver",
          },
        ],
      },
      color: "#e8e8e8",
      price: 6,
      enabled: true,
      stock: 100,
    },
  ],
  cordColor: [
    {
      name: {
        fi: [
          {
            name: "musta",
          },
        ],
        se: [
          {
            name: "svart",
          },
        ],
        en: [
          {
            name: "black",
          },
        ],
      },
      color: "#000000",
      price: 0,
      enabled: true,
      stock: 100,
    },
    {
      name: {
        fi: [
          {
            name: "kulta",
          },
        ],
        se: [
          {
            name: "guld",
          },
        ],
        en: [
          {
            name: "gold",
          },
        ],
      },
      color: "#ffcd59",
      price: 3,
      enabled: true,
      stock: 100,
    },
    {
      name: {
        fi: [
          {
            name: "hopea",
          },
        ],
        se: [
          {
            name: "silver",
          },
        ],
        en: [
          {
            name: "silver",
          },
        ],
      },
      color: "#e8e8e8",
      price: 3,
      enabled: true,
      stock: 100,
    },
  ],
  embroideryTextFront: { price: 10, enabled: true },
  embroideryTextBack: { price: 8, enabled: true },
};

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
  const [customization, setCustomization] = useState({
    badge: "fi",
    textColor: "yellow",
    roundRibbonColor: "",
    cordColor: "black",
    embroideryTextFront: { left: "Your Text", right: "Your Text" },
    embroideryTextBack: "Your Text",
    size: "",
    quantity: 1,
    productStorage: "",
  });

  const [prices, setPrices] = useState({
    cap_base_price: graduationCapCustomizationOptions.price,
    badge: 0,
    roundRibbonColor: 0,
    cordColor: 0,
    embroideryTextFront: 0,
    embroideryTextBack: 0,
  });

  return (
    <CustomizationContext.Provider
      value={{
        customization,
        setCustomization,
        prices,
        setPrices,
        graduationCapCustomizationOptions,
      }}
    >
      {props.children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  return context;
};
