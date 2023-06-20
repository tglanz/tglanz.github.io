import Link from "next/link";
import useConfig from "./utils/useConfig";


interface NavNode {
  title: string
  nav: (NavNode | NavLeaf)[]
}

interface NavLeaf {
  title: string
  target: string
}

type NavTree = (NavNode | NavLeaf)[]

const isLeaf = (node: NavNode | NavLeaf) => node.hasOwnProperty("target");

const NavLeaf = ({ leaf }: { leaf: NavLeaf }) => (
  <li>
    <Link href={leaf.target}>
      {leaf.title}
    </Link>
  </li>
)

const NavNode = ({ node }: { node: NavNode }) => (
  <details>
    <summary>{node.title}</summary>
    <ul className="ml-4">
      { 
        node.nav.map((node, index) => isLeaf(node)
          ? <NavLeaf key={index} leaf={node as NavLeaf} />
          : <NavTree key={index} nodes={(node as NavNode).nav} />
        )
      }
    </ul>
  </details>
)

const NavTree = ({ nodes }: { nodes: NavTree }) => {
  return (
    <ul>
      { 
        nodes.map((node, index) => isLeaf(node)
          ? <NavLeaf key={index} leaf={node as NavLeaf} />
          : <NavNode key={index} node={node as NavNode} />
        )
      }
    </ul>
  )
}

const Nav = () => {
  const config = useConfig();
  return <NavTree nodes={config.nav} />
};

export default Nav;