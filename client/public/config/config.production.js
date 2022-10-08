window.env = {
    host: {
        virtualPath: ''
    },
    server: {
        url: 'http://localhost:8081/api/'
    },
    map: {
        baseLayers: {
            en: {
                light: [{
                    id: 'WORLD_BASEMAP_LIGHT',
                    type: 'VECTOR-TILE',
                    title: 'Basemap',
                    url: 'https://www.arcgis.com/sharing/rest/content/items/8a2cba3b0ebf4140b7c0dc5ee149549a/resources/styles/root.json'
                }],
                dark: [{
                    id: 'WORLD_BASEMAP_DARK',
                    type: 'VECTOR-TILE',
                    title: 'Basemap',
                    url: 'https://www.arcgis.com/sharing/rest/content/items/c11ce4f7801740b2905eb03ddc963ac8/resources/styles/root.json'
                }]
            },
            ar: {
                light: [{
                    id: 'WORLD_BASEMAP_LIGHT',
                    type: 'VECTOR-TILE',
                    title: 'Basemap',
                    url: 'https://www.arcgis.com/sharing/rest/content/items/8a2cba3b0ebf4140b7c0dc5ee149549a/resources/styles/root.json'
                }],
                dark: [{
                    id: 'WORLD_BASEMAP_DARK',
                    type: 'VECTOR-TILE',
                    title: 'Basemap',
                    url: 'https://www.arcgis.com/sharing/rest/content/items/c11ce4f7801740b2905eb03ddc963ac8/resources/styles/root.json'
                }]
            }
        }
    },
    mapView: {
        properties: {
            scale: 73957190,
            center: [48.1325593, 29.048436],
            constraints: {
                maxScale: 4513,
                rotationEnabled: true
            }
        }
    }
}
