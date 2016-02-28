//
//  TouchData.swift
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-02-27.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation

public enum StrokeOrientation: String {
  case Left = "Left"
  case Right = "Right"
  case Up = "Up"
  case Down = "Down"
}

public enum EventCode: String {
  case SwipeUp = "SwipeUp"
  case SwipeDown = "SwipeDown"
  case SwipeLeft = "SwipeLeft"
  case SwipeRight = "SwipeRight"
  case MultiTouch = "MultiTouch"
}


class TouchData: NSObject {
  private var appName : String
  private var timestamp: String
  private var deviceOrientation: String
  private var x_precision: Double
  private var y_precision: Double
  private var x_coord: Double
  private var y_coord: Double
  
  //might not need these
  private var velocity_x: Double
  private var velocity_y: Double

  private var strokeOrientation: StrokeOrientation
  private var eventCode: EventCode
  
  init(appName: String, timestamp: String, deviceOrientation:String, gestureData: NSDictionary) {
    
    self.appName = appName
    self.timestamp = timestamp
    self.deviceOrientation = deviceOrientation
    
    //parse gesture data
    self.x_precision = (gestureData["dx"]?.doubleValue)!
    self.y_precision = (gestureData["dy"]?.doubleValue)!
    self.x_coord = (gestureData["x0"]?.doubleValue)!
    self.y_coord = (gestureData["y0"]?.doubleValue)!
    self.velocity_x = (gestureData["vx"]?.doubleValue)!
    self.velocity_y = (gestureData["vy"]?.doubleValue)!
    
    //Calculate swipe orientation
    if self.velocity_x > 0 {
      self.strokeOrientation = StrokeOrientation.Right
      self.eventCode = EventCode.SwipeRight
    }
    
    if self.velocity_x < 0 {
      self.strokeOrientation = StrokeOrientation.Left
      self.eventCode = EventCode.SwipeRight
    }
    
    if self.velocity_y < 0 {
      self.strokeOrientation = StrokeOrientation.Down
      self.eventCode = EventCode.SwipeDown
    } else {
      self.strokeOrientation = StrokeOrientation.Up
      self.eventCode = EventCode.SwipeUp
    }
    
    if gestureData["numberActiveTouches"]?.doubleValue > 1 {
      self.eventCode = EventCode.MultiTouch
    }
    
    //TODO: Calculate area of finger
    
    
    
  }
  
}
