package com.instasnap;

import com.facebook.react.ReactActivity;
import com.microsoft.codepush.react.CodePush;
import com.microsoft.codepush.react.CodePush;
import com.brentvatne.RCTVideo.ReactVideoPackage;
import com.smixx.reactnativeicons.ReactNativeIcons;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "InstaSnap";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new CodePush(null, this, BuildConfig.DEBUG),
            new CodePush("CdymXklporg-HZxPJ8XRUwxBxc_XV11xDbpZe", this, BuildConfig.DEBUG),
            new ReactVideoPackage(),
            new ReactNativeIcons(),
            new RCTCameraPackage()
        );
    }
}
