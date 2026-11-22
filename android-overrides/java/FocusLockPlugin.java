package com.focuslock.app;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "FocusLock")
public class FocusLockPlugin extends Plugin {

    @PluginMethod
    public void start(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            try { getActivity().startLockTask(); } catch (Exception e) {}
            call.resolve();
        });
    }

    @PluginMethod
    public void stop(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            try { getActivity().stopLockTask(); } catch (Exception e) {}
            call.resolve();
        });
    }
}
