import { Tag } from "./layout"
import { Link } from "gatsby"
import * as React from 'react'


export const LongCard = ({postData, toggleTag, selectedTags}) => {
    const {date, slug, image, sound, collection} = postData.fields
    const {title, tags, abstract} = postData.frontmatter

    return (
    <div className="long-card">
        <Link className="card-link" to={`/${collection}/` + slug}/>
        {image?.publicURL && (<img src={image.publicURL} />)}
        <div className="description">
            <h4>{title}</h4>
            <div class="small-tags-container">
                {tags ? tags.map(t => <Tag tagName={t} selectedTags={selectedTags} toggleTag={toggleTag} />) : ""}
            </div>
            {
                sound?.publicURL && (
                    <audio controls>
                        <source src={sound.publicURL} type="audio/wav"/>
                    </audio>
                )
            }
            <p class="text-sample">
                {abstract ? abstract : postData.excerpt}
            </p>
        </div>
    </div>
    )
}