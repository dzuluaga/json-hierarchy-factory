var clone = require('clone');

function json_hierarchy_factory(options) {
  return {
    get_full_nodes: get_full_nodes,
    get_root_node: get_root_node,
    get_tabular: get_tabular,
    get_nodes_renamed: get_nodes_renamed
  }

  function get_full_nodes(nodes) {
    var KVs = {};
    nodes.forEach((node) => {

      var current_node = KVs[node.node] || {
        node: node.node,
        parent: null,
        children: []
      };

      KVs[node.node] = current_node;

      if (!node.parent_name) return; //if has no parent, don't do more here.

      var parent_node = KVs[node.parent_name] || {
        node: node.parent_name,
        parent: null,
        children: []
      };

      KVs[parent_node.node] = parent_node;
      parent_node.children.push(current_node);
      current_node.parent = parent_node;
    });
    return KVs;
  }

  function get_root_node(full_nodes, with_parents) {
    with_parents = with_parents ? true : false;
    var full_nodes_clone = clone(full_nodes);

    // find the node that has no parent
    var root = full_nodes_clone[Object.keys(full_nodes_clone).find((key) => !full_nodes_clone[key].parent ? true : false)];
    if (with_parents) return root;
    return remove_parents(root);

    // aux functions
    function remove_parents(node) {
      node.parent = null;
      node.children.forEach((node) => remove_parents(node));
      return node;
    }
  }

  function get_tabular(root_node) {
    var tab_nodes = [];
    convert_to_tabular(root_node, tab_nodes);
    return tab_nodes;

    // aux functions
    function convert_to_tabular(node, tab_nodes) {
      if (!node) return;
      (tab_nodes||[]).push([node.node, node.parent ? node.parent.node : null]);
      node.children.forEach((child_node) => {
        convert_to_tabular(child_node, tab_nodes);
      });
    }
  }

  function get_nodes_renamed(root_node) {
    var root_node_array = [clone(root_node)];
    return rename_nodes(root_node_array);

    // aux functions
    function rename_nodes(root_node_array) {
      if (!root_node_array) return;
      root_node_array.forEach((node, index) => {
        var node_clone = clone(node.node),
          children_clone = clone(node.children);

        delete node.node;
        delete node.parent;
        delete node.children;
        
        root_node_array[index] = { // required to update a value in an array. Fails to update with forEach value 
          title: node_clone,
          nodes: rename_nodes(children_clone)
        }
      });
      return root_node_array;
    }
  }
}

module.exports = json_hierarchy_factory;