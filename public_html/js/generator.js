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
                this.getData(function(){
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
                return this.speech_data[this.settings.sentence_key].map(function(x){
                    var n = Math.floor(Math.random() * x.length) + 1;
                    return x[n];
                }).join(' ');
            };
            
            function _initEventListeners(){
                self.settings.sentences_submit.on('click', function(){
                    var speech = '';
                    for (var i = 0, max_p = self.settings.paragraphs_num.val(); i < max_p; i++) {
                        speech += '<p>';
                        
                        for (var j = 0, max_s = self.settings.sentences_num.val(); j < max_s; j++)
                            speech += self.generateSentence() + ' ';
                        
                        speech += '</p>';
                    }
                    
                    self.settings.generated_speech.html(speech);
                });
            }
        };
        
        
        var speech_path = 'speech_parts.json',
            app = new Generator(speech_path, {
                sentences_num: $('#SentencesNum'),
                paragraphs_num: $('#ParagraphsNum'),
                sentences_submit: $('#SentencesSubmit'),
                generated_speech: $('#GeneratedSpeech'),
                sentence_key: 'speech'
            });
        
        app.init();
    });
})(window, document, jQuery);