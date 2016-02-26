//
//  LocalNotificator.swift
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-02-26.
//  Copyright © 2016 Facebook. All rights reserved.
//

import UIKit

@objc(LocalNotificator)
class LocalNotificator: NSObject {
  
  
  @objc func requestPermissions() -> Void {
    if (RCTRunningInAppExtension()) {
      return;
    }
    
    let app: UIApplication = RCTSharedApplication()!
    let types: UIUserNotificationType = [.Badge, .Alert, .Sound]
    
    let category = UIMutableUserNotificationCategory()
    category.identifier = "SwiftReactNativeCategory"
    
    let settings = UIUserNotificationSettings( forTypes: types, categories: [category] )
    
    app.registerUserNotificationSettings(settings)
    app.registerForRemoteNotifications()
  }
  
  @objc func checkPermissions(callback: RCTResponseSenderBlock) -> Void {
    let defaultPermissions = ["alert": false, "badge": false, "sound": false]
    
    if (RCTRunningInAppExtension()) {
      callback([defaultPermissions]);
      return;
    }
    
    var types: UIUserNotificationType;
    if (UIApplication.instancesRespondToSelector(Selector("currentUserNotificationSettings"))) {
      if let settings = RCTSharedApplication()!.currentUserNotificationSettings() {
        types = settings.types
        var permissions = [String: Bool]()
        permissions["alert"] = types.contains(.Alert)
        permissions["badge"] = types.contains(.Badge)
        permissions["sound"] = types.contains(.Sound)
        
        callback([permissions]);
        return;
      }
    }
    
    callback([defaultPermissions]);
  }
  
  @objc func scheduleLocalNotification(notificationData: [String: AnyObject], callback: RCTResponseSenderBlock) -> Void {
    let notification = createLocalNotification(notificationData)
    RCTSharedApplication()!.scheduleLocalNotification(notification)
    callback([NotificationToDictionaryTransformer(notification: notification).transform()]);
    return;
  }
  
  private func createLocalNotification(notificationData: [String: AnyObject]) -> UILocalNotification {
    let notification = UILocalNotification()
    notification.soundName = UILocalNotificationDefaultSoundName
    notification.alertBody = notificationData["alertBody"] as? String
    notification.alertAction = notificationData["alertAction"] as? String
    notification.alertTitle = notificationData["alertTitle"] as? String
    
    if let hasAction = notificationData["hasAction"] {
      notification.hasAction = (hasAction as? Bool)!
    }
    
    notification.category = "schedulerViewItemCategory"
    
    if let fireDate = notificationData["fireDate"] {
      notification.fireDate = RCTConvert.NSDate(fireDate)
    }
    
    let uuid = NSUUID().UUIDString
    
    if let userInfo = notificationData["userInfo"] as? [NSObject : AnyObject]{
      notification.userInfo = userInfo
      notification.userInfo!["UUID"] = uuid
    } else {
      notification.userInfo = ["UUID": uuid]
    }
    
    return notification;
  }
  
  @objc func cancelLocalNotification(uuid: String) -> Void {
    for notification in RCTSharedApplication()!.scheduledLocalNotifications! as [UILocalNotification] {
      
      guard (notification.userInfo != nil) else {
        continue
      }
      
      guard notification.userInfo!["UUID"] as! String == uuid else {
        continue
      }
      RCTSharedApplication()!.cancelLocalNotification(notification)
      break
    }
  }
  
  @objc func testSwiftMethod(paramOne: String, paramTwo: Int) -> Void {
    print("param one: ", paramOne)
    print("param two: ", paramTwo)
  }
}
