import { iconNode } from 'discourse-common/lib/icon-library';
import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { ButtonClass } from 'discourse/widgets/button';

createWidget('post-admin-menu-button', jQuery.extend(ButtonClass, {
  tagName: 'li.btn',
  click() {
    this.sendWidgetAction('closeAdminMenu');
    return this.sendWidgetAction(this.attrs.action);
  }
}));

export default createWidget('post-admin-menu', {
  tagName: 'div.post-admin-menu.popup-menu',

  html(attrs) {
    const contents = [];
    contents.push(h('h3', I18n.t('admin_title')));

    if (!attrs.isWhisper && this.currentUser.staff) {
      const buttonAtts = { action: 'togglePostType', icon: 'shield', className: 'toggle-post-type' };

      if (attrs.isModeratorAction) {
        buttonAtts.label = 'post.controls.revert_to_regular';
      } else {
        buttonAtts.label = 'post.controls.convert_to_moderator';
      }
      contents.push(this.attach('post-admin-menu-button', buttonAtts));
    }

    if (attrs.canManage) {
      contents.push(this.attach('post-admin-menu-button', {
        icon: 'cog', label: 'post.controls.rebake', action: 'rebakePost', className: 'rebuild-html'
      }));

      if (attrs.hidden) {
        contents.push(this.attach('post-admin-menu-button', {
          icon: 'eye', label: 'post.controls.unhide', action: 'unhidePost', className: 'unhide-post'
        }));
      }
    }

    if (this.currentUser.admin) {
      contents.push(this.attach('post-admin-menu-button', {
        icon: 'user', label: 'post.controls.change_owner', action: 'changePostOwner', className: 'change-owner'
      }));
    }

    // toggle Wiki button
    if (attrs.wiki) {
      contents.push(this.attach('post-admin-menu-button', {
        action: 'toggleWiki', label: 'post.controls.unwiki', icon: 'pencil-square-o', className: 'wiki wikied'
      }));
    } else {
      contents.push(this.attach('post-admin-menu-button', {
        action: 'toggleWiki', label: 'post.controls.wiki', icon: 'pencil-square-o', className: 'wiki'
      }));
    }

    return contents;
  },

  clickOutside() {
    this.sendWidgetAction('closeAdminMenu');
  }
});
