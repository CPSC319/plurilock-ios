//
//  GestureLoggerBridge.m
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-02-26.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(GestureLogger, NSObject)

RCT_EXTERN_METHOD(retrievePanGestureData:(NSString *)appName timestamp:(NSString *)timestamp gestureData:(NSDictionary *)gestureData force:(double)force callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(retrieveKeyData:(NSString *)appName timestamp:(NSString *)timestamp keyData:(NSString *)keyData
                   callback:(RCTResponseSenderBlock)callback)

@end
