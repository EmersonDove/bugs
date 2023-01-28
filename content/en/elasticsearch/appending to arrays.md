---
title: Appending to an array in elasticsearch
position: 1
category: Elasticsearch
---

There isn't a ton of docs about appending to an array so here is a quick example.



Given this mapping inside the index `"index_name"`:

```python
es.indices.create(index='index_name', mappings={
    "dynamic": "strict",
    "properties": {
        "tags": {"type": "keyword"}
    }
})
```

This is the initial index:

```python
es.index(index="index_name", body={
    "tags": []
})
```

Append the tag `"test"` to the `"tags"` keyword mapping:

```python
self.es.update(index="index_name", id="the elasticsearch id for the initial index above", body={
    "script": {
        "source": "ctx._source.tags.addAll(params.tags)",
        "lang": "painless",
        "params": {
            "tags": ["test"]
        }
    }
})
```





