import { Tag } from "./layout"
import { Link } from "gatsby"
import * as React from 'react'


export const Card = ({postData, toggleTag, selectedTags}) => {
    const {date, slug, image, sound} = postData.fields
    const {title, tags, abstract} = postData.frontmatter

    return (
    <div className="card">
        <Link className="card-link" to={"/blog/" + slug}/>
        {image?.publicURL && (<img src={image.publicURL} />)}
        <h4>{title}</h4>
        <div class="small-tags-container">
            {tags ? tags.map(t => <Tag tagName={t} selectedTags={selectedTags} toggleTag={toggleTag} />) : ""}
        </div>
        <p className="date">
            <time datetime={date}>{date}</time>
        </p>
        <p class="text-sample">
            {abstract ? abstract : postData.excerpt}
        </p>
        </div>
    )
}