const app = new Vue({
    el: '#bookmarks',
    data: {
        marks: [],
        filterText: '',
        checked: false,
        defaultProps: {
            children: 'children',
            label: 'label'
        }
    },
    created: function () {
        chrome.bookmarks.getTree(markNodes => {
            this.marks = this.dumpTreeNodes(markNodes)[0].children;
        });
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        dumpTreeNodes: function (markNodes) {
            const tmpMarks = [];
            for (const node of markNodes) {
                tmpMarks.push(this.dumpNode(node));
            }
            return tmpMarks;
        },
        dumpNode: function (markNode) {
            const node = {};
            node.label = markNode.title || markNode.url;
            node.id = markNode.id++;
            node.url = markNode.url;
            const children = markNode.children;
            if (children && children.length > 0) {
                node.children = this.dumpTreeNodes(children);
            }
            return node;
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        },
        append(data) {
            alert(JSON.stringify(data));
        },

        remove(node, data) {
            alert(JSON.stringify(node));
            alert(JSON.stringify(data));
        }

    }
});