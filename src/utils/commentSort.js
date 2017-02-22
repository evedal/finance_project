export default function (comments) {
    let roots = [];
    let children = {};
    for(let i=0; i<comments.length;i++){
        let comment = comments[i];
        let p = comment.parent_comment_id;
        let target = !p ? roots : (children[p] || (children[p] = []));
        target.push({value : comment})
    }
    let findChildren = function (parent) {
        if(children[parent.value.comment_id]){
            parent.children = children[parent.value.comment_id];
            for(let i=0;i<parent.children.length;i++){
                findChildren(parent.children[i]);
            }
        }
    };
    for (let i =0;i<roots.length;i++){
        findChildren(roots[i]);
    }
    return roots;
}
