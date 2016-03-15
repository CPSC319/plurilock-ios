//
//  ServerController.swift
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-03-14.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import Starscream

class ServerController: NSObject, WebSocketDelegate {
  
  var socket = WebSocket(url: NSURL(string: "ws://btdemo.plurilock.com:8095")!)
  
  override init() {
    super.init()
    //let socket = WebSocket(url: NSURL(string: "ws://btdemo.plurilock.com:8095")!)
    print("CREATING SOCKET")
    socket.delegate = self
    
    socket.connect()
    socket.writeString("HELLO WORLD")
  }
  
  func websocketDidConnect(socket: WebSocket) {
    print("websocket is connected")
  }
  
  func websocketDidDisconnect(socket: WebSocket, error: NSError?) {
    print("websocket is disconnected: \(error?.localizedDescription)")
  }
  
  func websocketDidReceiveMessage(socket: WebSocket, text: String) {
    print("got some text: \(text)")
  }
  
  func websocketDidReceiveData(socket: WebSocket, data: NSData) {
    print("got some data: \(data.length)")
  }
  
  func getConnectionStatus() -> Bool {
    return socket.isConnected
  }
}