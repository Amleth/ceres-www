export const getRDFFrValue = data => data.find(l => l["@language"] === "fr")["@value"]

export const filterNodes = (nodes, search, searchTags) => nodes.filter(node => {
    /* Filter articles based on current research and if tags are selected*/
    const {title, tags, abstract} = node.frontmatter
    const nodeTags = tags ? tags : []
    const nodeText = abstract ? abstract : node.excerpt
    
    // asume we want to keep the node
    let keepNode = true
    
    // remove nodes that are descriping main pages 
    if(node.fields.slug === ""){
        keepNode = false
    }

    // is search is set, and if search is not in the tags nor the title nor the abstract
    if(search.trim().toLowerCase() !== "" && (nodeTags.indexOf(search) === -1 && title.toLowerCase().indexOf(search) === -1 && nodeText.toLowerCase().indexOf(search) === -1)){
        keepNode = false
    }
    // every selected search tag must be in the article tags
    for(let sTag of searchTags){
        if(nodeTags.indexOf(sTag) === -1 ){
            keepNode = false
        }
    }
    if(keepNode){
        return node
    }
})