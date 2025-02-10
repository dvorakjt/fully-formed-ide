import { NodeNotFoundError } from "@/errors/node-not-found-error";
import type { FileSystemNode } from "@/model/file-system-node";

export function findLowestCommonAncestor(
  nodeA: FileSystemNode,
  nodeB: FileSystemNode
) {
  let [shallowerNode, deeperNode]: [FileSystemNode, FileSystemNode] =
    nodeA.depth < nodeB.depth ? [nodeA, nodeB] : [nodeB, nodeA];

  while (deeperNode.depth > shallowerNode.depth) {
    if (!deeperNode.parent) {
      throw new NodeNotFoundError(
        `Could not find common ancestor of nodes [${nodeA.name}, ${nodeB.name}]`
      );
    }

    deeperNode = deeperNode.parent;
  }

  while (shallowerNode && deeperNode) {
    if (shallowerNode === deeperNode) {
      return shallowerNode;
    }

    if (!shallowerNode.parent || !deeperNode.parent) {
      break;
    }

    shallowerNode = shallowerNode.parent;
    deeperNode = deeperNode.parent;
  }

  throw new NodeNotFoundError(
    `Could not find common ancestor of nodes [${nodeA.name}, ${nodeB.name}]`
  );
}
