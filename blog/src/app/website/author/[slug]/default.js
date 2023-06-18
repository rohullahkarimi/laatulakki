import React from "react";
import { Route } from "react-router-dom";
import Container from "../../../../components/container";
import AuthorCard from "../../../../components/blog/authorCard";
import { MyLoader } from "../../../../utils/all";
import Footer from "../../../../components/footer";
import Navbar from "../../../../components/navbar";


function NotFound() {
  return (
   <MyLoader/>
 
  );
}

export default function Post(props) {
  const { loading, author } = props;

  const slug = author[0];

  if (!loading && !slug) {
    //notFound();
    return <Route component={NotFound} />
  }

  return (
    <>
      <Navbar/>
      <Container className="!pt-0">
        
          {author[0] && <AuthorCard author={author[0]} />}
          <Footer/>
      </Container>
    </>
  );
}

