export default [
    {
        name: "首页",
        url: './index',
    },
    {
        nanme: "设置",
        children: [
            { name: "房型维护", url: "/setroom" },
            { name: "楼栋楼层", url: "/setbuild" },
            { nanme: "房间管理", url: "/rootlis" }
        ]
    }
]