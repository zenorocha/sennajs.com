'use strict'

import Component from 'metal-component';
import Soy from 'metal-soy';

import templates from './SidebarHome.soy';

class SidebarHome extends Component {
  	created() {
		const section = this.section;
		const childrenActive = section.children.find(child => child.active);

		this.activeClass = childrenActive ? '' : 'active';
	}
}

Soy.register(SidebarHome, templates);

export default SidebarHome;