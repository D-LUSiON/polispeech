(function(window, document, $){
    $(function(){
        /**
         * The generator class
         * 
         * @param {string} speech_path Path to speech data json file
         * @param {object} options Path to speech data json file
         * @returns {generator_L1.generator_L2.Generator}
         */
        var Generator = function(speech_path, options){
            var self = this;
            
            this.speech_path = speech_path;
            this.speech_data = {};
            
            this.settings = options;
            
            this.init = function(){
                this.getData(function(speech_data){
                    console.log(speech_data);
                    _initEventListeners();
                });
            };

            this.getData = function(callback){
                $.ajax({
                    url: self.speech_path,
                    dataType: 'json',
                    success: function(response){
                        if (response && typeof response === 'object')
                            self.speech_data = response;
                        
                        if (typeof callback === 'function')
                            callback.apply(self, [response]);
                    }
                });
            };
            
            this.generateSentence = function(){
                var sentence = this.speech_data[this.settings.sentence_key].map(function(x){
                    console.log(x.length);
                    return x[0];
                }).join(' ');
                console.log(sentence);
                
                return sentence;
            };
            
            function _initEventListeners(){
                self.settings.sentences_submit.on('click', function(){
                    self.generateSentence();
                });
            }
        };
        
        
        var speech_path = 'speech_parts.json',
            app = new Generator(speech_path, {
                sentences_input: $('#SentencesInput'),
                sentences_submit: $('#SentencesSubmit'),
                sentence_key: 'speech'
            });
        
        app.init();
    });
})(window, document, jQuery);