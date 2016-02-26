//
//  LocalNotificatorBridge.m
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-02-26.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(LocalNotificator, NSObject)

RCT_EXTERN_METHOD(requestPermissions)
RCT_EXTERN_METHOD(checkPermissions:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(scheduleLocalNotification:(NSDictionary *)notificationData callback:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(cancelLocalNotification:(NSString *)uuid)

RCT_EXTERN_METHOD(testSwiftMethod:(NSString *)paramOne paramTwo:(NSInteger *)paramTwo)

@end
