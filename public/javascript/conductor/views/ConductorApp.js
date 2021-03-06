ConductorSpace.ConductorApp = Backbone.View.extend({

  className: "mainPage",

  initialize: function(params) {
    this.template = this.model.get('templates')['conductorApp'];
    this.server = params.server;
    $('body').prepend(this.render().el);
    this.router = new ConductorSpace.Router({ el: this.$el.find('#container'), model: this.model });
    Backbone.history.start({pushstate:true});
    this.model.on('toggleSound', this.toggleSound.bind(this));
    this.model.on('toggleMotion', this.toggleMotion.bind(this));
    this.model.on('toggleStrobe', this.toggleStrobe.bind(this));
    this.model.on('audioLightControl', this.audioLightControl.bind(this));
    this.model.on('changeColor', this.sendColor.bind(this));
    this.model.on('randomColor', this.randomColor.bind(this));
    this.model.on('newFadeTime', this.newFadeTime.bind(this));
    this.model.on('newSeparationFactor', this.newSeparationFactor.bind(this));
    this.model.on('newCohesionFactor', this.newCohesionFactor.bind(this));
    this.model.on('newAlignmentFactor', this.newAlignmentFactor.bind(this));
    this.model.on('newSpeedFactor', this.newSpeedFactor.bind(this));

    this.server.on('resetSelf', this.resetSelf.bind(this));
  },

  render: function(){
    // debugger;
    this.$el.html( this.template() );
    return this;
  },

  resetSelf: function() {
    this.model.reset();
  },

  toggleStrobe: function(data) {
    this.server.emit('toggleStrobe', { strobe: data.strobe });
  },

  toggleMotion: function(data) {
    this.server.emit('toggleMotion', { motion: data.motion });
  },

  audioLightControl: function(data) {
    this.server.emit('audioLightControl', { audio: data.audioLightControl });
    console.log('toggleSound in ConductorApp.js');
  },

  toggleSound: function(data) {
    this.server.emit('toggleSound', { sound: data.sound });
  },

  sendColor: function(data) {
    this.server.emit('changeColor', data);
  },

  tiltGrid: function(data) {
    this.server.emit('tiltGrid', data);
  },

  randomColor: function(data) {
    this.server.emit('randomColor', data);
  },

  newFadeTime: function(data) {
    this.server.emit('newFadeTime', data);
  },

  newSeparationFactor: function(data) {
    this.server.emit('newSeparationFactor', data);
  },

  newCohesionFactor: function(data) {
    this.server.emit('newCohesionFactor', data);
  },

  newAlignmentFactor: function(data) {
    this.server.emit('newAlignmentFactor', data);
  },

  newSpeedFactor: function(data) {
    this.server.emit('newSpeedFactor', data);
  }
});