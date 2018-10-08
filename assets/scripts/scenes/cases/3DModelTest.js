
function traversal (node, cb) {
    var children = node.children;

    for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        traversal(child, cb);
    }

    cb(node);
}

cc.Class({
    extends: cc.Component,

    properties: {
        root: {
            default: null,
            type: cc.Node
        },
        complexModel: {
            default: null,
            type: cc.Prefab
        },
        simpleNumLabel: {
            default: null,
            type: cc.Label
        },
        complexNumLabel: {
            default: null,
            type: cc.Label
        },
        simpleTrisLabel: {
            default: null,
            type: cc.Label
        },
        complexTrisLabel: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.simpleNum = 0;
        this.complexNum = 0;
    },

    randomPosition (node) {
        let width = cc.visibleRect.width;
        let height = cc.visibleRect.height;
        node.x = Math.random() * width - width/2;
        node.y = Math.random() * height - height/2;
    },

    createComplexModel () {
        let model = cc.instantiate(this.complexModel);
        model.parent = this.root;
        this.randomPosition(model);

        this.complexNum += 1;
        this.complexNumLabel.string = this.complexNum;

        let tris = 0;
        traversal(model, node => {
            let renderer = node.getComponent(cc.MeshRenderer);
            if (!renderer) return;

            let ibs = renderer.mesh._ibs;
            for (let i = 0; i < ibs.length; i++) {
                tris += (ibs[i].data.length / 3) | 0;
            }
        })
        this.complexTrisLabel.string = tris;
    },

    createSimpleModel () {
        let gfx = cc.renderer.renderEngine.gfx;
        let vfmtPosColor = new gfx.VertexFormat([
            { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 3 },
        ]);

        let mesh = new cc.Mesh();
        mesh.init(vfmtPosColor, 8, true);
        this.mesh = mesh;
        
        mesh.setVertexes(gfx.ATTR_POSITION, [
            cc.v3(-100, 100, 100), cc.v3(-100, -100, 100), cc.v3(100, 100, 100), cc.v3(100, -100, 100),
            cc.v3(-100, 100, -100), cc.v3(-100, -100, -100), cc.v3(100, 100, -100), cc.v3(100, -100, -100)
        ]);

        mesh.setIndices([
            0, 1, 2, 1, 3, 2, // front
            0, 6, 4, 0, 2, 6, // top
            2, 7, 6, 2, 3, 7, // right
            0, 5, 4, 0, 1, 5, // left
            1, 7, 5, 1, 3, 7, // bottm,
            4, 5, 6, 5, 7, 6, // back
        ]);

        let node = new cc.Node();
        node.color = cc.Color.BLUE;
        let renderer = node.addComponent(cc.MeshRenderer);
        renderer.mesh = mesh;
        node.is3DNode = true;
        node.parent = this.root;

        this.randomPosition(node);

        this.simpleNum += 1;
        this.simpleNumLabel.string = this.simpleNum;

        this.simpleTrisLabel.string = 12;
    }

    // update (dt) {},
});
