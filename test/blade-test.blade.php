<p>
    {{ __('text', 'domain') }}
</p>
<p>
    @php _e('text', 'domain') @endphp
</p>
<p>
    {{ _n('single', 'plural', 1, 'domain') }}
</p>
<p>
    {{ _x('text', 'context', 'domain') }}
</p>
<p>
    @php _ex('text', 'context', 'domain') @endphp
</p>
<p>
    {{ _nx('single', 'plural', 1, 'context', 'domain') }}
</p>
<p>
    {{ esc_attr__('text', 'domain') }}
</p>
<p>
    @php esc_attr_e('text', 'domain') @endphp
</p>
<p>
    {{ esc_attr_x('text', 'context', 'domain') }}
</p>
<p>
    {{ esc_html__('text', 'domain') }}
</p>
<p>
    @php esc_html_e('text', 'domain') @endphp
</p>
<p>
    {{ esc_html_x('text', 'context', 'domain') }}
</p>
<p>
    @php _n_noop('singular', 'plural', 'domain') @endphp
</p>
<p>
    @php _nx_noop('singular', 'plural', 'context', 'domain') @endphp
</p>
