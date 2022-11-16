import DocumentList from './DocumentList.js';
import DocumentAddButton from './DocumentAddButton.js';

import { fetchDocuments } from '../utils/api.js';
import { isNew } from '../utils/helper.js';
import SidebarHeader from './SidebarHeader.js';

export default function Sidebar({ $target, initialState, onAdd, onDelete }) {
  isNew(new.target);

  const $sidebar = document.createElement('div');
  $sidebar.className = 'sidebar';

  $target.appendChild($sidebar);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  new SidebarHeader({
    $target: $sidebar,
    initialState: {
      workspaceName: '📔 김유리의 Notion',
    },
  });

  const documentList = new DocumentList({
    $target: $sidebar,
    initialState: {
      documents: [],
      selectedId: this.state.selectedId,
    },
    onAdd,
    onDelete,
  });

  const documentAddButton = new DocumentAddButton({
    $target: $sidebar,
    initialState: {
      position: 'sidebar-bottom',
      text: '새 페이지',
    },
    onAdd,
  });

  this.render = async () => {
    const documents = await fetchDocuments(null);
    documentList.setState({
      documents,
      selectedId: this.state.selectedId,
    });
    documentAddButton.render();
  };

  this.render();
}
