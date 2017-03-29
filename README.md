json-hierarchy-factory
======================
Transform JSON Hierarchies into tabular format and viceversa. Includes circular references to parent.

```
var json_hierarchy_factory = require('json-hierarchy-factory')();

var table = [{
    node: 'API Program',
    parent_name: null
  },
  {
    node: 'Billing Services',
    parent_name: 'API Program'
  },
  {
    node: 'Customer Service/Customer Experience',
    parent_name: 'API Program'
  },
  {
    node: 'Data Services',
    parent_name: 'API Program'
  },
  {
    node: 'Accounts',
    parent_name: 'Billing Services'
  },
  {
    node: 'Contacts',
    parent_name: 'Accounts'
  },
  {
    node: 'Documents',
    parent_name: 'Accounts'
  },
  {
    node: 'CRM API',
    parent_name: 'Customer Service/Customer Experience'
  },
  {
    node: 'Security API',
    parent_name: 'Data Services'
  },
  {
    node: 'Resource A',
    parent_name: 'Security API'
  }
];

var full_nodes = json_hierarchy_factory.get_full_nodes(table);
var root_node = json_hierarchy_factory.get_root_node(full_nodes, false);

```

#### Output

##### json_hierarchy_factory.get_full_nodes(table)
```javascript

// json_hierarchy_factory.get_full_nodes(table) will return
{ 'API Program':
   { node: 'API Program',
     parent: null,
     children: [ [Object], [Object], [Object] ] },
  'Billing Services':
   { node: 'Billing Services',
     parent: { node: 'API Program', parent: null, children: [Object] },
     children: [ [Object] ] },
  'Customer Service/Customer Experience':
   { node: 'Customer Service/Customer Experience',
     parent: { node: 'API Program', parent: null, children: [Object] },
     children: [ [Object] ] },
  'Data Services':
   { node: 'Data Services',
     parent: { node: 'API Program', parent: null, children: [Object] },
     children: [ [Object] ] },
  Accounts:
   { node: 'Accounts',
     parent:
      { node: 'Billing Services',
        parent: [Object],
        children: [Object] },
     children: [ [Object], [Object] ] },
  Contacts:
   { node: 'Contacts',
     parent: { node: 'Accounts', parent: [Object], children: [Object] },
     children: [] },
  Documents:
   { node: 'Documents',
     parent: { node: 'Accounts', parent: [Object], children: [Object] },
     children: [] },
  'CRM API':
   { node: 'CRM API',
     parent:
      { node: 'Customer Service/Customer Experience',
        parent: [Object],
        children: [Object] },
    children: [] },
  'Security API':
   { node: 'Security API',
     parent: { node: 'Data Services', parent: [Object], children: [Object] },
     children: [ [Object] ] },
  'Resource A':
   { node: 'Resource A',
     parent: { node: 'Security API', parent: [Object], children: [Object] },
     children: [] } }
```
##### json_hierarchy_factory.get_root_node(full_nodes, false)

Note `include_parents` second parameter. This will return children parents as null. Useful to avoid circular reference errors when converting objects into JSON with stringify (TypeError: Converting circular structure to JSON).  

```javascript
  { node: 'API Program',
    parent: null,
    children:
    [ { node: 'Billing Services', parent: null, children: [Object] },
      { node: 'Customer Service/Customer Experience',
        parent: null,
        children: [Object] },
      { node: 'Data Services', parent: null, children: [Object] } ] }
```

#### json_hierarchy_factory.get_tabular

```javascript
// json_hierarchy_factory.get_tabular(json_hierarchy_factory.get_root_node(full_nodes, true))
  [ [ 'API Program', null ],
    [ 'Billing Services', 'API Program' ],
    [ 'Accounts', 'Billing Services' ],
    [ 'Contacts', 'Accounts' ],
    [ 'Documents', 'Accounts' ],
    [ 'Customer Service/Customer Experience', 'API Program' ],
    [ 'CRM API', 'Customer Service/Customer Experience' ],
    [ 'Data Services', 'API Program' ],
    [ 'Security API', 'Data Services' ],
    [ 'Resource A', 'Security API' ] ]
```

#### Install
```bash
npm install json-hierarchy-factory --save
```

### Test
```
node test/index.js
```