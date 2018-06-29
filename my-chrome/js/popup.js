const app = new Vue({
    el: '#bookmarks',
    data: {
        marks: []
    },
    beforeCreate: function () {
        chrome.bookmarks.getTree(marks => {
            this.dumpTreeNodes(marks);
        });
    },
    methods: {
        dumpTreeNodes: function (markNodes) {
            for (const node of markNodes) {
                this.marks.push(this.dumpNode(node));
            }
        },
        dumpNode: function (markNode) {
            if (markNode.title) {
                // mark
                return markNode;
            }
            // tmp object
            const children = markNode.children;
            if (children && children.length > 0) {
                this.dumpTreeNodes(children);
            }
        }
    }
});