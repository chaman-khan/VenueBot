#import "AppDelegate.h"
#import <Firebase.h>
#import <GoogleMaps/GoogleMaps.h>

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyA-4CW3RJxhVCSTrImtIdOJ-4k9zXMZQF4"]; // add this line using the api key obtained from Google Console
  self.moduleName = @"VenueBot";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  [FIRApp configure];
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
