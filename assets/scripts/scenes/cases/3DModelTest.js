const baseRenderScene = require("baseRenderScene");
let config = require("config");

cc.Class({
    extends: baseRenderScene,

    properties: {
        prefab: cc.Prefab,
        root: cc.Node,
        info: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this._super(this.name.match(/<(\S*)>/)[1]);

        let totalCount = config.SCENE_ARGS.count;

        for (let i = 0; i < totalCount; i++) {
            let node = cc.instantiate(this.prefab);
            this.randomPosition(node);
            this.root.addChild(node);
        }

        this.updateDesc();
    },

    updateDesc () {
        let prefabNode = this.prefab.data;
        let tris = 0;
        let verts = 0;
        let submesh = 0;
        
        let children = prefabNode.children;
        for (let i = 0; i < children.length; i++) {
            let renderer = children[i].getComponent(cc.MeshRenderer);
            if (!renderer) continue;
            let mesh = renderer.mesh;
            if (!mesh) continue;

            let primitives = mesh._primitives;
            for (let j = 0; j < primitives.length; j++) {
                let range = primitives[j].data;
                tris += range.length / 2;
                submesh ++;
            }

            let bundles = mesh._vertexBundles;
            for (let j = 0; j < bundles.length; j++) {
                verts += bundles[j].verticesCount;
            }
        }

        tris /= 3;

        let desc = [
            `Node : ${config.SCENE_ARGS.count}`,
            `Bone : ${prefabNode.getComponent(cc.SkeletonAnimation).model.nodes.length}`,
            `Tris : ${tris}`,
            `Verts : ${verts}`,
            `SubMesh : ${submesh}`
        ]

        config.TEST_CASE[config.CURRENT_CASE].desc = desc.join(', ');
        this.info.string = desc.join(',\n');
    },

    randomPosition (node) {
        let width = cc.visibleRect.width;
        let height = cc.visibleRect.height;
        node.x = Math.random() * width - width/2;
        node.y = Math.random() * height - height/2;
    },

});