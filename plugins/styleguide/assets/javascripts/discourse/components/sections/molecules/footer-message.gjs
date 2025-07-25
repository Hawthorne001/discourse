import FooterMessage from "discourse/components/footer-message";
import StyleguideExample from "discourse/plugins/styleguide/discourse/components/styleguide-example";

const FooterMessageMolecule = <template>
  <StyleguideExample @title="<FooterMessage> - default">
    <FooterMessage
      @education={{@dummy.sentence}}
      @message={{@dummy.short_sentence}}
    />
  </StyleguideExample>

  <StyleguideExample @title="<FooterMessage> - latest">
    <FooterMessage
      @education={{@dummy.sentence}}
      @message={{@dummy.short_sentence}}
      @latest={{true}}
      @canCreateTopicOnCategory={{true}}
      @createTopic={{@dummyAction}}
    />
  </StyleguideExample>

  <StyleguideExample @title="<FooterMessage> - top">
    <FooterMessage
      @education={{@dummy.sentence}}
      @message={{@dummy.short_sentence}}
      @top={{true}}
      @changePeriod={{@dummyAction}}
    />
  </StyleguideExample>
</template>;

export default FooterMessageMolecule;
