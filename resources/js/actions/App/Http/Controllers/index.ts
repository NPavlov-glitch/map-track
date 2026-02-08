import WalkController from './WalkController'
import ProfileViewController from './ProfileViewController'
import Settings from './Settings'
const Controllers = {
    WalkController: Object.assign(WalkController, WalkController),
ProfileViewController: Object.assign(ProfileViewController, ProfileViewController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers