# Emotion API

Extension of the Code-Data-Model:

https://developer.ard.de/docs/ard-core-datamodel

Add the Tables:

+ Emotions (sad, haha, angry, ...), time (TC,full)
+ Tags (string, id), time (TC, full)
+ Tags_x_Items (m:n for tags and items)

Draw.io-XML
[ARD Core Emotion API.xml]

![ARD Core Emotion API.png]

Postman-Collection
[ARDCore Emotion API.postman_collection.json]

## PUT

Add an emotion or a Tag to an Item by ID

//asset-dev.ardmediathek.de/asset-api/item/:id

### Emotion to ID

Add an Emotion with the time-code

```json
{
    "emotion":"string",
    "time":"00:00:00"
}
```

### Tags to ID

Add a Tag with the time-code

```json
{
    "tags": [
        "string",
        "..."
    ],
    "time":"00:00:00"
}
```

## GET

Get additional emotion / tag info with the item

### Emotions / Tags by Item

Get an Item, Response includes now emotions and tags

//asset-dev.ardmediathek.de/asset-api/item/:id

```json
{
    "id":"xxx",
    "emotions": [
        {
            "emotion":"string",
            "time":"00:00:00"
        }
    ],
    "tags": [
        {
            "tag":"string",
            "time":"00:00:00"
        }
    ]
}
```

### List of Emotions with AssetIds

Get a List of Items by the emotion used

//asset-dev.ardmediathek.de/asset-api/emotions/:emotion

```json
[
    {
        "id":"xxx",
        "time":"00:00:00"
    }
]
```

### List of Tags with AssetIds

Get a List of Items by the Tag used

//asset-dev.ardmediathek.de/asset-api/tags/:tag

```json
[
    {
        "id":"xxx",
        "time":"00:00:00"
    }
]
```