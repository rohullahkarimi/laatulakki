import React from 'react'
//import {Link} from "react-router-dom"; //"next/link";
import Label from "../ui/label";

export default function CategoryLabel({
  categories,
  nomargin = false
}) {

  return (
    <div className="flex gap-3">
      {categories && categories?.length &&
        categories.slice(0).map((category, index) => (
        
          <Label  key={index} nomargin={nomargin} color={category.color}>
            {category.title}
          </Label>
        
        ))}
    </div>
  );
}

// href of category page
//  href={`/category/${category?.slug?.current}`}
