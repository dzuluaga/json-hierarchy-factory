const json_hierarchy_factory = require('..')();

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
//console.log(full_nodes);

//console.log(root_node);
//console.log(json_hierarchy_factory.get_nodes_renamed(root_node)[0]);
//console.log(dag_factory.get_root_node(dag, true));

console.log(json_hierarchy_factory.get_tabular(json_hierarchy_factory.get_root_node(full_nodes, true)));
