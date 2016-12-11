package com.view;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.views.webview.ReactWebViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by linhao on 2016/11/25.
 */
public class CustomReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
       List<NativeModule> modules = new ArrayList<>();
        modules.add(new ReactSwipeRefreshLayoutManager());
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> result = new ArrayList<ViewManager>();
        result.add(new ReactWebViewManager());
        result.add(new ReactSwipeRefreshLayoutManager());
        return result;
    }
}
